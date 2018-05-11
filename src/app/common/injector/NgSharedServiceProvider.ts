import {InjectionToken, Provider, Type} from '@angular/core';
import {ISharedInjector} from './ISharedInjector';

export interface IExportManifest {
  exportToken: string;
  localToken: any;
}

export class NgSharedServiceProvider {

  static readonly EXPORT_MANIFESTS = new InjectionToken<IExportManifest[]>('exportManifests');
  static readonly INJECTOR_NAME = new InjectionToken<string>('parentInjectorName');

  static import<T>(token: string, clazz: T): Provider[] {
    return [{
      provide: clazz, // 'myservice'
      useFactory: (injector: ISharedInjector) => {
        console.log('import');
        if (injector) {
          return injector.get(token, clazz);
        } else {
          throw new Error('Failed to find shared injector');
        }
      },
      deps: [ISharedInjector]
    }];
  }

  static export<T extends Type<any>>(token: string, clazz: T): Provider[] {
    return [{
      provide: NgSharedServiceProvider.EXPORT_MANIFESTS,
      multi: true,
      useValue: {
        exportToken: token,
        localToken: clazz
      }
    }];
  }
}


