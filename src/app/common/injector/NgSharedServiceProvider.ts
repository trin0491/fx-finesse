import {APP_INITIALIZER, InjectionToken, Injector, Provider, Type} from '@angular/core';
import {NgInjector} from './NgInjector';
import {ISharedInjector} from './ISharedInjector';
import {SharedInjectorBase} from './SharedInjectorBase';

export class NgSharedServiceProvider {
  // TODO debug mode that stores the registrations so they can be tested at run time
  static readonly PARENT_INJECTOR_NAME = new InjectionToken<string>('parentInjectorName');

  static import<T>(token: string, clazz: T): Provider[] {
    return [{
      provide: token,
      useFactory: (ngInjector: Injector, parentName: string) => {
        const injector: ISharedInjector = SharedInjectorBase.getInstance(parentName);
        if (injector) {
          return injector.get(token, clazz);
        } else {
          throw new Error('Failed to find shared injector');
        }
      },
      deps: [Injector, NgSharedServiceProvider.PARENT_INJECTOR_NAME]
    }, {
      provide: clazz,
      useExisting: token
    }];
  }

  static exportClass<T extends Type<any>>(token: string, clazz: T): Provider[] {
    return [{
      provide: clazz,
      useClass: clazz
    }, {
      provide: token,
      useExisting: clazz
    }];
  }

  static exportExisting<T extends Type<any>>(token: string, clazz: T): Provider[] {
    return [{
      provide: token,
      useExisting: clazz
    }];
  }

  static shareInjector(): Provider[] {
    return [{
      provide: APP_INITIALIZER,
      useFactory: (ngInjector: Injector, parentName) => {
        return () => {
          const newInjector = NgInjector.fromParent(parentName, ngInjector);
          SharedInjectorBase.setInstance(parentName, newInjector);
        };
      },
      deps: [Injector, NgSharedServiceProvider.PARENT_INJECTOR_NAME],
      multi: true
    }];
  }
}


