import {InjectionToken} from '@angular/core';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

export const STORE = new InjectionToken<any>('desktopJS.Store');

export abstract class MessageBusStore<T> {
  public static readonly ACTION_TOPIC = 'Actions';
  public static readonly STATE_TOPIC = 'State';
}

export interface IStore<T> {
  dispatch<V extends Action>(action: V): void;

  select<K>(mapFn: (state: T) => K): Observable<K>;
}
