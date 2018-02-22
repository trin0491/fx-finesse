import {IInjector} from './IInjector';

export abstract class InjectorBase implements IInjector {

  static getInstance(name: string): IInjector {
    return window[name];
  }

  static setInstance(name: string, injector: IInjector) {
    window[name] = injector;
  }

  constructor(private _parent: IInjector) {
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
