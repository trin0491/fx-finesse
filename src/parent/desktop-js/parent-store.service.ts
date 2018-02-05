import {MessageBusService} from '../../common/desktop-js/message-bus.service';
import {Action, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';

@Injectable()
export class ParentStoreService<T> {

  private static ACTION_TOPIC = 'Actions';
  private static STATE_TOPIC = 'State';

  constructor(private _msgBus: MessageBusService, private _store: Store<T>) {
    this._msgBus.getMessages<Action>(ParentStoreService.ACTION_TOPIC)
      .subscribe((action: Action) => {
        this.dispatch(action);
      });
  }

  dispatch<V extends Action>(action: V): void {
    this._store.dispatch(action);
  }

  select<K>(mapFn: (state: T) => K): Store<K> {
    return this._store.select(mapFn);
  }

}
