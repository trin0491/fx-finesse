export type SchedulerFn = (work: (...args: any[]) => void, delay: number) => void;

export type CalculateDelayFn = (nRetries: number) => number;

export function exponentialDelayFn(initialDelay: number, maxDelay: number) {
  return (nRetries: number) => {
    return Math.min(maxDelay, initialDelay * Math.pow(2, nRetries));
  };
}

export class Retryable<T> {

  private static readonly INITIAL_DELAY_MS = 250;
  private static readonly MAX_DELAY_MS = 10000;

  private _scheduler: SchedulerFn;
  private _progressCallbacks: ((progress) => void)[];
  private _delay: CalculateDelayFn;
  private _nRetries: number;
  private _hasRun;

  constructor(private _workFn: () => Promise<T>, private readonly _maxRetries: number = null) {
    if (!this._workFn) {
      throw Error('Work function must be defined');
    }
    if (_maxRetries !== null && (!isFinite(_maxRetries) || Math.floor(_maxRetries) !== _maxRetries || _maxRetries < 0)) {
      throw new Error('nRetries is not a positive integer or null');
    }
    this._nRetries = 0;
    this._delay = exponentialDelayFn(Retryable.INITIAL_DELAY_MS, Retryable.MAX_DELAY_MS);
    this._scheduler = setTimeout;
    this._progressCallbacks = [];
    this._hasRun = false;
  }

  get scheduler(): SchedulerFn {
    return this._scheduler;
  }

  set scheduler(scheduler: SchedulerFn) {
    if (!scheduler) {
      throw Error('Scheduler must be defined');
    }
    this._scheduler = scheduler;
  }

  get delay(): CalculateDelayFn {
    return this._delay;
  }

  set delay(fn: CalculateDelayFn) {
    if (!fn) {
      throw new Error('Calculate Interval Function cannot be null');
    }
    this._delay = fn;
  }

  run(): Promise<T> {
    if (this._hasRun) {
      throw new Error('Action has already been run');
    }
    this._hasRun = true;
    return new Promise<T>((resolve, reject) => this.getResult(resolve, reject));
  }

  /**
   * This uses a recursive algorithm instead of chaining .catch() in order to support
   * unconstrained number of retries.
   *
   * @param {(value?: (PromiseLike<T> | T)) => void} resolve
   * @param {(reason?: any) => void} reject
   */
  private getResult(resolve: (value?: (PromiseLike<T> | T)) => void, reject: (reason?: any) => void) {
    const p: Promise<T> = this._workFn();
    if (!p) {
      reject(new Error('Work function failed to provide a promise'));
    }
    p.then((result: T) => {
      this.emitProgress({canRetry: true, success: true, retryCount: this._nRetries});
      resolve(result);
    }, (reason) => {
      const canRetry = this.canRetry(this._nRetries);
      if (canRetry) {
        this.emitProgress({canRetry: true, success: false, retryCount: this._nRetries});
        this.schedule(() => this.getResult(resolve, reject), this.getDelay(this._nRetries));
        this._nRetries++;
      } else {
        reject(reason);
      }
    }).catch(reject);
  }

  private emitProgress(progress) {
    this._progressCallbacks.forEach((callback) => {
      try {
        callback(progress);
      } catch (err) {
        console.error('Unhandled error thrown by progress callback', err);
      }
    });
  }

  private canRetry(nRetries: number): boolean {
    return this._maxRetries === null || nRetries < this._maxRetries;
  }

  private getDelay(nRetries: number): number {
    return this._delay(nRetries);
  }

  private schedule(handler: () => void, timeout) {
    this._scheduler(handler, timeout);
  }
}
