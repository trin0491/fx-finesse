import ChannelClient = fin.ChannelClient;
import {from, Observable, Subscriber, concat, of} from 'rxjs';
import Identity = fin.Identity;
import {catchError, concatMap, map} from 'rxjs/operators';

export class MatrixConnect {

  constructor() {

  }

  // TODO name and should this return more than the UUID of the process?
  private getMatrixConnect(): Observable<Identity> {
    return from(
      fin.System.launchExternalProcess({
        path: 'C:\\Users\\rprie\\source\\repos\\SharkFin\\SharkFin\\bin\\Release\\netcoreapp3.1\\publish\\SharkFin.exe',
        arguments: '',
        listener: (result) => {
          console.log('the exit code', result.exitCode);
        },
        lifetime: 'window'
      })
    ).pipe(
      // TODO rubbish error handling
      catchError((err) => {
        console.error('Failed to start process: ', err);
        return of(null);
      }),
    );
  }

  getChannel(channelName: string): Observable<ChannelClient> {
    return this.getMatrixConnect().pipe(
      concatMap((identity) => {
        return new Observable<ChannelClient>((subscriber: Subscriber<ChannelClient>) => {
          let channel: ChannelClient;
          fin.InterApplicationBus.Channel.connect(channelName).then((client: ChannelClient) => {
            channel = client;
            subscriber.next(channel);
            subscriber.complete();
          }).catch((reason) => {
            subscriber.error(reason);
          });

          return () => {
            if (channel) {
              channel.disconnect();
            }
          };
        });
      })
    );
  }
}
