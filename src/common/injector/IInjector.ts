export interface IInjector {
  get<T>(token: string, clazz: T): T;
}
