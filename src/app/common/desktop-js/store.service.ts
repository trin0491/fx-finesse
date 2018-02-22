import {InjectionToken} from '@angular/core';
import {Action, Store} from '@ngrx/store';

export const STORE = new InjectionToken<any>('desktopJS.Store');

export abstract class MessageBusStore<T> {
  protected static readonly ACTION_TOPIC = 'Actions';
  protected static readonly STATE_TOPIC = 'State';
}

export interface IStore<T> {
  dispatch<V extends Action>(action: V): void;
  select<K>(mapFn: (state: T) => K): Store<K>;
}
