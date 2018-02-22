import {IInjector} from './IInjector';
import {InjectorBase} from './InjectorBase';


export class AngularJSInjector extends InjectorBase implements IInjector {

  protected doGet<T>(token: string, clazz: T): T {
    return undefined;
  }
}
