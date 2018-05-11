import {Injectable, NgZone} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {IStore, MessageBusStore} from '../common/desktop-js/store.service';
import 'rxjs/add/operator/takeUntil';
import {Observable} from 'rxjs/Observable';
import {MessageBus} from '../common/desktop-js/message-bus.service';

export function enterZone(zone: NgZone) {
  return <T>(source: Observable<T>) =>
    new Observable<T>(observer =>
      source.subscribe({
        next: (x) => zone.run(() => observer.next(x)),
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      })
    );
}


@Injectable()
export class ChildStore<T> implements IStore<T> {

  constructor(private _msgBus: MessageBus, private _storeImpl: Store<T>, private _ngZone: NgZone) {
  }

  dispatch<V extends Action>(action: V): void {
    this._msgBus.publish(MessageBusStore.ACTION_TOPIC, action);
  }

  select<K>(mapFn: (state: T) => K): Observable<K> {
    return this._storeImpl.select(mapFn).pipe(
      enterZone(this._ngZone)
    );
  }
}
