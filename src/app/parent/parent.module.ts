import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ParentPageComponent} from './parent-page.component';
import {CounterModule} from '../common/counter/counter.module';
import {SharedServicesModule} from './shared-service.module';

@NgModule({
  imports: [
    CommonModule,
    CounterModule,
    SharedServicesModule,
    RouterModule.forChild([{
      path: '',
      component: ParentPageComponent
    }])
  ],
  declarations: [
    ParentPageComponent
  ]
})
export class ParentModule {
}
