import {Injector, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ChildPageComponent} from './child-page.component';
import {CounterModule} from '../common/counter/counter.module';
import {Store} from '@ngrx/store';
import {NgSharedServiceProvider} from '../common/injector/NgSharedServiceProvider';
import {STORE} from '../common/desktop-js/store.service';
import {ChildStore} from './child-store.service';
import {SharedInjectorBase} from '../common/injector/SharedInjectorBase';
import {ISharedInjector} from '../common/injector/ISharedInjector';
import {NgInjector} from '../common/injector/NgInjector';

@NgModule({
  declarations: [
    ChildPageComponent
  ],
  imports: [
    CommonModule,
    CounterModule,
    RouterModule.forChild([{
      path: '',
      component: ChildPageComponent
    }])
  ],
  providers: [{
    provide: STORE,
    useClass: ChildStore
  }, {
    provide: NgSharedServiceProvider.INJECTOR_NAME,
    useValue: 'sharedInjector'
  }, {
    provide: ISharedInjector,
    useFactory: (ngInjector: Injector, name: string) => {
      const newInjector = NgInjector.fromParent(name, ngInjector);
      SharedInjectorBase.setInstance(name, newInjector);
      console.log('Created shared injector');
      return newInjector;
    },
    deps: [Injector, NgSharedServiceProvider.INJECTOR_NAME]
  },
    NgSharedServiceProvider.import('myStore', Store)
  ]
})
export class ChildModule {

  constructor() {
    console.log('Created Child Module');
  }
}
