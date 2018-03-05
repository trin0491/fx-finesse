import {ISharedInjector} from './ISharedInjector';
import {SharedInjectorBase} from './SharedInjectorBase';
import {Injector} from '@angular/core';


export class NgInjector extends SharedInjectorBase implements ISharedInjector {

  static fromParent(parentName: string, injector: Injector): ISharedInjector {
    const parent: ISharedInjector = SharedInjectorBase.getInstance(parentName);
    return new NgInjector(parent, injector);
  }

  constructor(parent: ISharedInjector, private _ngInjector: Injector) {
    super(parent);
  }

  doGet<T>(token: string, clazz: T): T {
    // TODO cannot use string token because ng5 has deprecated it and is using Type<T> | InjectionToken
    return this._ngInjector.get(token, null);
  }

}
