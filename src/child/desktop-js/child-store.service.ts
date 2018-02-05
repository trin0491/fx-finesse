import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {MessageBus} from '../../common/desktop-js/message-bus.service';
import {Observable} from 'rxjs/Observable';
import {IStore, MessageBusStore} from '../../common/desktop-js/store.service';

@Injectable()
export class ChildStore<T> extends MessageBusStore<T> implements IStore<T> {

  private _state: Observable<any>;

  constructor(private _msgBus: MessageBus) {
    super();
    this._state = this._msgBus.getMessages(MessageBusStore.STATE_TOPIC);
  }

  dispatch<V extends Action>(action: V): void {
    this._msgBus.publish(MessageBusStore.ACTION_TOPIC, action);
  }

  select<K>(mapFn: (state: T) => K): Store<K> {
    return select(mapFn)(this._state);
  }
}
