import {Inject, Injectable} from '@angular/core';
import {Container, MessageBusSubscription} from '@morgan-stanley/desktopjs';
import {Observable} from 'rxjs/Observable';
import {CONTAINER} from './container.service';

@Injectable()
export class MessageBusService {

  constructor(@Inject(CONTAINER) private _container: Container) { }

  getMessages<T>(topic: string): Observable<T> {
    return Observable.create((observer) => {
      const p: Promise<MessageBusSubscription> = this._container.ipc.subscribe(topic, (event, msg) => {
        observer.next(msg);
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
