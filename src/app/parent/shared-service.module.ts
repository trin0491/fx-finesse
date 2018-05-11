import {Store, StoreModule} from '@ngrx/store';
import {STORE} from '../common/desktop-js/store.service';
import {ParentStoreService} from './parent-store.service';
import {Inject, Injector, NgModule, NgZone} from '@angular/core';
import {counterReducer} from './reducers/counter-reducer';
import {CommonModule} from '@angular/common';
import {IExportManifest, NgSharedServiceProvider} from '../common/injector/NgSharedServiceProvider';
import {SharedInjectorBase} from '../common/injector/SharedInjectorBase';
import {NgInjector} from '../common/injector/NgInjector';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({counter: counterReducer}),
  ],
  providers: [{
    provide: STORE,
    useClass: ParentStoreService
  }, {
    provide: NgSharedServiceProvider.INJECTOR_NAME,
    useValue: 'sharedInjector'
  },
    NgSharedServiceProvider.export('myStore', Store),
    NgSharedServiceProvider.export('ngZone', NgZone),
  ],
})
export class SharedServicesModule {

  constructor(@Inject(NgSharedServiceProvider.INJECTOR_NAME) name: string,
              @Inject(NgSharedServiceProvider.EXPORT_MANIFESTS) manifests: IExportManifest[],
              ngInjector: Injector,
              ngZone: NgZone) {
    console.log('Created Shared Services Module and exporting services');
    const providers = manifests.map((manifest) => {
      return {
        provide: manifest.exportToken,
        useFactory: () => {
          return ngZone.run(() => ngInjector.get(manifest.localToken));
        },
        deps: []
      };
    });
    const sharedInjector = NgInjector.fromParent(name, Injector.create({providers: providers, parent: null, name: name}));
    SharedInjectorBase.setInstance(name, sharedInjector);
  }
}
