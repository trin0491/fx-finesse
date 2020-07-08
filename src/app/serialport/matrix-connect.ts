import ChannelClient = fin.ChannelClient;
import {from, Observable, Subscriber, concat, of} from 'rxjs';
import Identity = fin.Identity;
import {catchError, concatMap, map} from 'rxjs/operators';

export class MatrixConnect {

  // number of ms to wait for process to exit gracefully before issuing terminate
  private static readonly TERMINATE_TIMEOUT = 3000;

  constructor() {

  }

  // TODO name and should this return more than the UUID of the process?
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
          // error or complete?
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

  isSupported(): Observable<boolean> {
    // TODO we need a way to detect whether matrix connect is supported on this platform
    //  1) openfin
    //  2) windows
    //  3) administrator has granted us the launch external process entitlement (can we detect?)
    return of(typeof fin !== 'undefined');
  }

  getChannel(channelName: string): Observable<ChannelClient> {
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
    );
  }
}
