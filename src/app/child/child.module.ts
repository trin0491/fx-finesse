import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ChildPageComponent} from './child-page.component';
import {CounterModule} from '../common/counter/counter.module';
import {Store} from '@ngrx/store';
import {NgSharedServiceProvider} from '../common/injector/NgSharedServiceProvider';
import {STORE} from '../common/desktop-js/store.service';
import {ChildStore} from './child-store.service';

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
    provide: NgSharedServiceProvider.PARENT_INJECTOR_NAME,
    useValue: 'sharedInjector'
  }, NgSharedServiceProvider.import('myStore', Store)]
})
export class ChildModule {
}
