import {MessageBus} from '../../common/desktop-js/message-bus.service';
import {Action, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {IStore} from '../../common/desktop-js/store.service';
import {MessageBusStore} from '../../common/desktop-js/store.service';

@Injectable()
export class ParentStoreService<T> extends MessageBusStore<T> implements IStore<T> {

  constructor(private _msgBus: MessageBus, private _store: Store<T>) {
    super();
    this._msgBus.getMessages<Action>(MessageBusStore.ACTION_TOPIC)
      .subscribe((action: Action) => {
        this.dispatch(action);
      });

    this._store.subscribe((state: T) => {
      this._msgBus.publish(MessageBusStore.STATE_TOPIC, state);
    });
  }

  dispatch<V extends Action>(action: V): void {
    this._store.dispatch(action);
  }

  select<K>(mapFn: (state: T) => K): Store<K> {
    return this._store.select(mapFn);
  }
}
