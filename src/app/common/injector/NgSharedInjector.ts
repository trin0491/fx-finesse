import {ISharedInjector} from './ISharedInjector';
import {SharedInjectorBase} from './SharedInjectorBase';
import {Injector} from '@angular/core';


export class NgSharedInjector extends SharedInjectorBase implements ISharedInjector {

  static fromParent(parentName: string, injector: Injector): ISharedInjector {
    let parent: ISharedInjector = null;
    if (window.opener) {
      parent = window.opener[parentName];
    }
    return new NgSharedInjector(parent, injector);
  }

  constructor(parent: ISharedInjector, private _ngInjector: Injector) {
    super(parent);
  }

  doGet<T>(token: string, clazz: T): T {
    // TODO cannot use string token because ng5 has deprecated it and is using Type<T> | InjectionToken
    return this._ngInjector.get(token, null);
  }

}
