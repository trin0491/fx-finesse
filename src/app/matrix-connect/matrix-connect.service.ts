import ChannelClient = fin.ChannelClient;
import {Injectable} from '@angular/core';
import {MatrixConnectProcess} from './matrix-connect-process.service';

enum State {
  Stopped,
  Starting,
  Started,
  Stopping,
}

@Injectable()
export class MatrixConnectService {

  private refCount = 0;
  private state = State.Stopped;

  constructor(private process: MatrixConnectProcess) {

  }

  private acquire(): void {
    this.refCount += 1;
    this.evaluate();
  }

  private release(): void {
    if (this.refCount > 0) {
      this.refCount -= 1;
      this.evaluate();
    } else {
      throw new Error('Invalid State: attempt to decrement Matrix Connect reference count below zero');
    }
  }

  private start(): void {
    console.log('Starting Matrix Connect');
    this.state = State.Starting;
    this.process.start((result) => {
      if (result.exitCode !== 0) {
        console.error(`Process ${result.uuid} exited with error code ${result.exitCode}`);
      }
      this.state = State.Stopped;
    }).then((identity) => {
      this.state = State.Started;
      this.evaluate();
    }, (err) => {
      console.error('Failed to start Matrix Connect', err);
      this.state = State.Stopped;
    });
  }

  private stop(): void {
    console.log('Stopping Matrix Connect');
    this.state = State.Stopping;
    this.process.stop().then(() => {
      this.state = State.Stopped;
      this.evaluate();
    }, (err) => {
      console.error('Failed to stop Matrix Connect', err);
      this.state = State.Started;
    });
  }

  // TODO should this retry (re-evaluate) if process fails to start/stop - more trouble than it is probably worth
  // given it would need to track retry count and use return code of process to detect duplicate process
  private evaluate(): void {
    if (this.refCount > 0 && this.state === State.Stopped) {
      this.start();
    } else if (this.refCount < 1 && this.state === State.Started) {
      this.stop();
    }
  }

  isSupported(): Promise<boolean> {
    // TODO we need a way to detect whether matrix connect is supported on this platform
    //  1) openfin
    //  2) windows
    //  3) administrator has granted us the launch external process entitlement (can we detect?)
    return Promise.resolve(typeof fin !== 'undefined');
  }

  openChannel(channelName: string): Promise<ChannelClient> {
    this.acquire();
    return this.process.connect(channelName).catch((reason) => {
      console.error('Failed to open channel', reason);
      this.release();
      throw reason;
    });
  }

  closeChannel(channel: ChannelClient): Promise<void> {
    return channel.disconnect().then(() => {
      this.release();
    }).catch((reason) => {
      console.error('Failed to close channel', reason);
      throw reason;
    });
  }

  subscribe<T>(topic: string, callback: (msg: T) => void): Promise<void> {
    this.acquire();
    return this.process.subscribe(topic, callback).catch((err) => {
      this.release();
      throw err;
    });
  }

  unsubscribe<T>(topic: string, callback: (msg: T) => void): Promise<void> {
    return this.process.unsubscribe(topic, callback).then(() => {
      this.release();
    });
  }
}
