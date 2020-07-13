import { Injectable } from '@angular/core';
import {MatrixConnectService} from './matrix-connect.service';
import ChannelClient = fin.ChannelClient;
import {from, Observable} from 'rxjs';
import {concatMap, first, map} from 'rxjs/operators';

// TODO extract abstract class to use as token and 'interface' for consumers
@Injectable({
  providedIn: 'root'
})
export class SerialPortService {

  private static readonly CHANNEL_NAME = 'SerialPort';

  constructor(private matrixConnect: MatrixConnectService) {
  }

  isSupported(): Observable<boolean> {
    return from(this.matrixConnect.isSupported());
  }

  // TODO return Promise or Observable?
  getPorts(): Observable<string[]> {
    return from(this.dispatch('getPorts')).pipe(
      map((response: any) => {
        // TODO deserialise the json response and validate
        return response;
      })
    );
  }

  sendKey(key: string): Observable<void> {
    return from(this.dispatch('sendKey', key));
  }

  openPort(portName: string): Observable<string> {
    // TODO there will be a more elegant way of doing this that actually deals with race condition between subscription and dispatch
    return new Observable<string>((subscriber) => {

      const msgBusSub = this.matrixConnect.subscribe<string>('dataReceived')
        .subscribe((msg) => subscriber.next(msg), (err) => subscriber.error(err));

      this.dispatch('openPort', portName).catch((err) => {
        msgBusSub.unsubscribe();
        subscriber.error(err);
      });

      return () => {
        msgBusSub.unsubscribe();
      };
    });
  }

  private dispatch(action: string, payload?: any): Promise<any> {
      return this.matrixConnect.openChannel(SerialPortService.CHANNEL_NAME).then((client: ChannelClient) => {
          return client.dispatch(action, payload).finally(() => {
            this.matrixConnect.closeChannel(SerialPortService.CHANNEL_NAME);
          });
      });
  }
}
