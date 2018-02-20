import {IInjector} from './IInjector';
import {InjectorBase} from './InjectorBase';


export class WorkspaceInjector extends InjectorBase implements IInjector {

  doGet<T>(token: string, clazz: T): T {
    return undefined;
  }

}
