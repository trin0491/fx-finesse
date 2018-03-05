import {ISharedInjector} from './ISharedInjector';
import {SharedInjectorBase} from './SharedInjectorBase';


export class WorkspaceInjector extends SharedInjectorBase implements ISharedInjector {

  doGet<T>(token: string, clazz: T): T {
    return undefined;
  }

}
