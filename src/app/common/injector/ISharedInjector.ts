export interface ISharedInjector {
  get<T>(token: string, clazz: T): T;
}
