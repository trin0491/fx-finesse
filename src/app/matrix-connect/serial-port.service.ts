import { Injectable } from '@angular/core';
import {MatrixConnect} from './matrix-connect';
import ChannelClient = fin.ChannelClient;
import {from, Observable} from 'rxjs';
import {concatMap, first, map} from 'rxjs/operators';

// TODO extract abstract class to use as token and 'interface' for consumers
@Injectable({
  providedIn: 'root'
})
export class SerialPortService {

  constructor(private matrixConnect: MatrixConnect) {
  }

  isSupported(): Observable<boolean> {
    return this.matrixConnect.isSupported();
  }

  // TODO return Promise or Observable?
  getPorts(): Observable<string[]> {
    return this.dispatch('getPorts').pipe(
      map((response: any) => {
        // TODO deserialise the json response and validate
        return response;
      })
    );
  }

  sendKey(key: string): Observable<void> {
    return this.dispatch('sendKey', key);
  }

  private dispatch(action: string, payload?: any): Observable<any> {
      return this.matrixConnect.getChannel('SerialPort').pipe(
        concatMap((client: ChannelClient) => {
          return from(client.dispatch(action, payload));
        }),
        first()
      );
  }
}
