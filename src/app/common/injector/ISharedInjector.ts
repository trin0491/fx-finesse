export abstract class ISharedInjector {
  abstract get<T>(token: string, clazz: T): T;
}
