import { Injectable } from '@angular/core';
import {MatrixConnect} from './matrix-connect';
import ChannelClient = fin.ChannelClient;
import {from, Observable, of, Subscriber} from 'rxjs';
import {concatMap, first, map} from 'rxjs/operators';

// TODO extract abstract class to use as token and 'interface' for consumers
@Injectable({
  providedIn: 'root'
})
export class SerialPortService {

  constructor(private matrixConnect: MatrixConnect) {
  }

  isSupported(): Observable<boolean> {
    // TODO we need a quick way to detect whether matrix connect is supported on this platform, i.e. Windows openfin
    return of(typeof fin !== 'undefined');
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

  private dispatch(action: string): Observable<any> {
      return this.matrixConnect.getChannel('SerialPort').pipe(
        first(),
        concatMap((client: ChannelClient) => {
          return from(client.dispatch(action));
        })
      );
  }
}
