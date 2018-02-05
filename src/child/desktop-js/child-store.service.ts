import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {MessageBusService} from '../../common/desktop-js/message-bus.service';

@Injectable()
export class ChildStore<T> {

  private static ACTION_TOPIC = 'Actions';
  private static STATE_TOPIC = 'State';

  constructor(private _msgBus: MessageBusService, private _store: Store<T>) { }

  dispatch<V extends Action>(action: V): void {
    this._msgBus.publish(ChildStore.ACTION_TOPIC, action);
  }

  select<K>(mapFn: (state: T) => K): Store<K> {
    return this._store.select(mapFn);
  }
}
