import ChannelClient = fin.ChannelClient;
import {Observable, Subscriber, of} from 'rxjs';
import Identity = fin.Identity;
import {concatMap} from 'rxjs/operators';

export class MatrixConnect {

  // number of ms to wait for process to exit gracefully before issuing terminate
  private static readonly TERMINATE_TIMEOUT = 3000;
  private static readonly UUID = '8651D4BB-5B58-4AE6-9984-3E6DB1641E7D';

  // TODO inject fin. dependencies so this class can be unit tested
  constructor() {

  }

  // TODO this should be a state machine
  private getMatrixConnect(): Observable<Identity> {
    return new Observable<Identity>((subscriber => {
      // // TODO do we need to detect existing instance?
      let identity: Identity;
      fin.System.launchExternalProcess({
        path: 'C:\\Users\\rprie\\source\\repos\\SharkFin\\SharkFin\\bin\\Release\\netcoreapp3.1\\publish\\SharkFin.exe',
        arguments: '',
        listener: (result) => {
          console.log(`Process ${result.uuid} exited with code ${result.exitCode}`);
          identity = null;
          // check error or complete?
          subscriber.complete();
        },
        lifetime: 'window'
      }).then((id: Identity) => {
        console.log('Process started: ', id);
        identity = id;
        subscriber.next(identity);
      }).catch((error) => {
        console.error('Process failed to start', error);
        subscriber.error(error);
      });

      return () => {
        // TODO do we need to create a shutdown command to shutdown gracefully and shutdown instance that we didn't start?
        if (identity) {
          fin.System.terminateExternalProcess({
            uuid: identity.uuid,
            timeout: MatrixConnect.TERMINATE_TIMEOUT,
            killTree: true
          }).catch((reason) => {
            console.error('Failed to terminate: ', reason);
          });
        }
      };
    }));
  }

  isSupported(): Promise<boolean> {
    // TODO we need a way to detect whether matrix connect is supported on this platform
    //  1) openfin
    //  2) windows
    //  3) administrator has granted us the launch external process entitlement (can we detect?)
    return Promise.resolve(typeof fin !== 'undefined');
  }

  openChannel(channelName: string): Promise<ChannelClient> {
    // TODO creating channel client is orthogonal to MatrixConnect identity so they should occur parallel
    return this.getMatrixConnect().pipe(
      concatMap((identity) => {
        return new Observable<ChannelClient>((subscriber: Subscriber<ChannelClient>) => {
          let channel: ChannelClient;
          fin.InterApplicationBus.Channel.connect(channelName).then((client: ChannelClient) => {
            channel = client;
            subscriber.next(channel);
          }).catch((reason) => {
            subscriber.error(reason);
          });

          return () => {
            if (channel) {
              channel.disconnect().catch((reason) => {
                console.error('Failed to disconnect from channel: ' + channelName, reason);
              });
            }
          };
        });
      })
    ).toPromise();
  }

  closeChannel(channelName: string): void {

  }

  subscribe<T>(topic: string): Observable<T> {
    return new Observable<T>(subscriber => {
      fin.InterApplicationBus.subscribe({uuid: MatrixConnect.UUID}, topic, (message) => {
        subscriber.next(message);
      }).catch((err) => {
        subscriber.error(err);
      });
    });
  }
}
