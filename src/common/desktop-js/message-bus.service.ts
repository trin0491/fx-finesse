import {Inject, Injectable, NgZone} from '@angular/core';
import {Container, MessageBusSubscription} from '@morgan-stanley/desktopjs';
import {Observable} from 'rxjs/Observable';
import {CONTAINER} from './container.service';

@Injectable()
export class MessageBus {

  constructor(@Inject(CONTAINER) private _container: Container, private _ngZone: NgZone) { }

  getMessages<T>(topic: string): Observable<T> {
    return Observable.create((observer) => {
      const p: Promise<MessageBusSubscription> = this._container.ipc.subscribe(topic, (event, msg) => {
        this._ngZone.run(() => {
          observer.next(msg);
        });
      });
      return () => {
        p.then((subscription) => {
          this._container.ipc.unsubscribe(subscription);
        });
      };
    });
  }

  publish(topic: string, message: any): void {
    this._container.ipc.publish<any>(topic, message);
  }
}
