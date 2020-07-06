import ChannelClient = fin.ChannelClient;
import {Observable, Subscriber} from 'rxjs';

export class MatrixConnect {

  constructor() {

  }

  // TODO name and should this return more than whether it is running
  private getMatrixConnect(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      subscriber.next(true);
    });
  }

  getChannel(channelName: string): Observable<ChannelClient> {
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
  }
}
