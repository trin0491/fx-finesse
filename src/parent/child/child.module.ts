import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ChildAppComponent} from '../../child/child-app.component';
import {CounterModule} from '../../common/counter/counter.module';
import {Store} from '@ngrx/store';
import {NgSharedServiceProvider} from '../../common/injector/NgSharedServiceProvider';

@NgModule({
  declarations: [
    ChildAppComponent
  ],
  imports: [
    CommonModule,
    CounterModule,
    RouterModule.forChild([{
      path: '',
      component: ChildAppComponent
    }])
  ],
  providers: [{
    provide: NgSharedServiceProvider.PARENT_INJECTOR_NAME,
    useValue: 'sharedInjector'
  }, ...NgSharedServiceProvider.get('myStore', Store)]
})
export class ChildModule {
}
