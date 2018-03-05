import {ISharedInjector} from './ISharedInjector';
import {SharedInjectorBase} from './SharedInjectorBase';

export class AngularJSInjector extends SharedInjectorBase implements ISharedInjector {

  static fromParent(parentName: string, $injector: any): ISharedInjector {
    const parent: ISharedInjector = SharedInjectorBase.getInstance(parentName);
    return new AngularJSInjector(parent, $injector);
  }

  constructor(parent: ISharedInjector, private _$injector: any) {
    super(parent);
  }

  protected doGet<T>(token: string, clazz: T): T {
    if (this._$injector.has(token)) {
      return this._$injector.get(token);
    } else {
      return null;
    }
  }
}
