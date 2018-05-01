import {ISharedInjector} from './ISharedInjector';

export abstract class SharedInjectorBase implements ISharedInjector {

  static getInstance(name: string): ISharedInjector {
    return window[name];
  }

  static setInstance(name: string, injector: ISharedInjector) {
    window[name] = injector;
  }

  protected constructor(private _parent: ISharedInjector) {
  }

  get<T>(token: string, clazz: T): T {
    let instance = this.doGet(token, clazz);
    if (!instance && this._parent) {
      instance = this._parent.get(token, clazz);
    }
    return instance;
  }

  protected abstract doGet<T>(token: string, clazz: T): T;

}
