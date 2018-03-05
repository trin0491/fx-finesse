import {IInjector} from './IInjector';
import {InjectorBase} from './InjectorBase';

export class AngularJSInjector extends InjectorBase implements IInjector {

  static fromParent(parentName: string, $injector: any): IInjector {
    const parent: IInjector = InjectorBase.getInstance(parentName);
    return new AngularJSInjector(parent, $injector);
  }

  constructor(parent: IInjector, private _$injector: any) {
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
