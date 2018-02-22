import {MessageBus} from '../../common/desktop-js/message-bus.service';
import {Action, Store} from '@ngrx/store';
import {Inject, Injectable, OnDestroy} from '@angular/core';
import {IStore, MessageBusStore} from '../../common/desktop-js/store.service';
import {CONTAINER, WindowCreatedAction} from '../../common/desktop-js/container.service';
import {Container, ContainerEventArgs} from '@morgan-stanley/desktopjs';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ParentStoreService<T> extends MessageBusStore<T> implements IStore<T>, OnDestroy {

  private _isDestroyed: Subject<void>;

  constructor(private _msgBus: MessageBus,
              private _store: Store<T>,
              @Inject(CONTAINER) private _container: Container) {
    super();
    this._isDestroyed = new Subject();
    this._msgBus.getMessages<Action>(MessageBusStore.ACTION_TOPIC)
      .takeUntil(this._isDestroyed)
      .subscribe((action: Action) => {
        this.dispatch(action);
      });

    this._store.takeUntil(this._isDestroyed)
      .subscribe((state: T) => {
        this._msgBus.publish(MessageBusStore.STATE_TOPIC, state);
      });

    const windowCreated: Observable<ContainerEventArgs> = Observable.create((observer) => {
      this._container.addListener('window-created', (event: ContainerEventArgs) => {
        observer.next(event);
      });
      return () => {
        this._container.removeListener('window-created', observer.next);
      };
    });

    windowCreated.takeUntil(this._isDestroyed)
      .subscribe((event: ContainerEventArgs) => {
        this.dispatch(new WindowCreatedAction());
      });
  }

  dispatch<V extends Action>(action: V): void {
    this._store.dispatch(action);
  }

  select<K>(mapFn: (state: T) => K): Store<K> {
    return this._store.select(mapFn);
  }

  ngOnDestroy(): void {
    this._isDestroyed.next();
  }
}
