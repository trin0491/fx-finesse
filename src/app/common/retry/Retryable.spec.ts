import {Retryable} from './Retryable';


describe('Retryable', () => {

  const ERROR = new Error('mock error');
  const RESULT = true;

  let retryable: Retryable<boolean>;
  let mockFn;
  let mockSetTimeout;

  beforeEach(() => {
    mockSetTimeout = jasmine.createSpy('setTimeout');
    mockSetTimeout.and.callFake((handler) => {
      setTimeout(handler, 0);
    });
    mockFn = jasmine.createSpy('mockPromiseFunction');
    newRetryable();
  });

  function newRetryable(nRetries?: number) {
    retryable = new Retryable<boolean>(mockFn, nRetries);
    retryable.scheduler = mockSetTimeout;
  }

  function returnPromises(results: Promise<boolean>[]) {
    let i = 0;
    mockFn.and.callFake(() => {
      return results[i++];
    });
  }

  function reject() {
    return Promise.reject(ERROR);
  }

  function resolve() {
    return Promise.resolve(RESULT);
  }

  function expectSetTimeoutWithDelays(expectedTimes: number[]) {
    const DELAY_ARG = 1;

    expect(mockFn).toHaveBeenCalledTimes(expectedTimes.length + 1);
    expect(mockSetTimeout).toHaveBeenCalledTimes(expectedTimes.length);
    expectedTimes.forEach((expectedTime: number, i: number) => {
      expect(mockSetTimeout.calls.argsFor(i)[DELAY_ARG]).toBe(expectedTime);
    });
  }

  it('should throw an error if the work function is not defined', () => {
    expect(() => new Retryable(null)).toThrowError();
  });

  it('should throw an error if number of retries is not a positive integer or null', () => {
    expect(() => newRetryable(-1)).toThrowError();
    expect(() => newRetryable(0.5)).toThrowError();
    expect(() => newRetryable(Number.POSITIVE_INFINITY)).toThrowError();
    expect(() => newRetryable()).toBeDefined();
    expect(() => newRetryable(1)).toBeDefined();
  });

  it('should have a scheduler property', () => {
    expect(retryable.scheduler).toBe(mockSetTimeout);
    expect(() => {
      retryable.scheduler = null;
    }).toThrowError();
  });

  it('should have a delay property', () => {
    expect(retryable.delay).toBeDefined();
    expect(() => {
      retryable.delay = null;
    }).toThrowError();
  });

  it('should reject the promise if the function fails to provide a promise', () => {
    mockFn.and.returnValue(null);
    return retryable.run().catch((reason) => {
      expect(reason).toBeDefined();
      expect(reason.message).toBeDefined();
    });
  });

  it('should behave like a promise when run with no errors', () => {
    returnPromises([resolve()]);
    const p = retryable.run();
    expect(p).toBeDefined();
    expect(mockFn).toHaveBeenCalled();
    expect(mockSetTimeout).not.toHaveBeenCalled();

    return p.then((result: boolean) => {
      expectSetTimeoutWithDelays([]);
      expect(result).toBe(RESULT);
    });
  });

  it('should prevent the action from being executed twice', () => {
    returnPromises([resolve(), resolve()]);
    return retryable.run().then((result) => {
      expect(result).toBe(RESULT);
      expectSetTimeoutWithDelays([]);
    }).then(() => {
      expect(() => retryable.run()).toThrowError();
    });
  });

  it('should retry once and resolve', () => {
    newRetryable(1);
    returnPromises([
      Promise.reject(new Error('bad things')),
      resolve()
    ]);

    return retryable.run().then((result) => {
      expect(result).toBe(RESULT);
      expectSetTimeoutWithDelays([250]);
    });
  });

  it('should retry once and reject', () => {
    newRetryable(1);
    returnPromises([
      reject(),
      Promise.reject('last mock error'),
    ]);

    return retryable.run().then(() => {
      fail();
    }).catch((reason) => {
      expect(reason).toBe('last mock error');
      expectSetTimeoutWithDelays([250]);
    });
  });

  it('should retry twice and resolve', () => {
    newRetryable(2);
    returnPromises([
      reject(),
      reject(),
      resolve()
    ]);

    return retryable.run().then((result) => {
      expect(result).toBe(RESULT);
      expectSetTimeoutWithDelays([250, 500]);
    });
  });

  it('should provide an exponential back off with max of 10 seconds by default', () => {
    newRetryable();
    returnPromises([
      reject(),
      reject(),
      reject(),
      reject(),
      reject(),
      reject(),
      reject(),
      resolve(),
    ]);

    return retryable.run().then((result) => {
      expect(result).toBe(RESULT);
      expectSetTimeoutWithDelays([
        250,
        500,
        1000,
        2000,
        4000,
        8000,
        10000,
      ]);
    });
  });

  it('should not retry and reject the promise if the delay function throws an error', () => {
    retryable.delay = () => {
      throw new Error('bad interval');
    };
    returnPromises([
      reject(),
      resolve(),
    ]);
    return retryable.run().catch((reason) => {
      expect(reason.message).toBe('bad interval');
      expectSetTimeoutWithDelays([]);
    });
  });
});
