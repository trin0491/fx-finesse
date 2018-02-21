import {IInjector} from './IInjector';
import {InjectorBase} from './InjectorBase';
import {Injector} from '@angular/core';


export class NgInjector extends InjectorBase implements IInjector {

  static fromParent(parentName: string, injector: Injector): IInjector {
    const parent: IInjector = InjectorBase.getInstance(parentName);
    return new NgInjector(parent, injector);
  }

  constructor(parent: IInjector, private _ngInjector: Injector) {
    super(parent);
  }

  doGet<T>(token: string, clazz: T): T {
    // TODO cannot use string token because ng5 has deprecated it and is using Type<T> | InjectionToken
    return this._ngInjector.get(token, null);
  }

}
