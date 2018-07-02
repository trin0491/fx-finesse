import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ParentPageComponent} from './parent-page.component';
import {CounterModule} from '../common/counter/counter.module';
import {SharedServicesModule} from './shared-service.module';
import {UserPageComponent} from './user-page.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    CounterModule,
    SharedServicesModule,
    HttpClientModule,
    RouterModule.forChild([{
      path: '',
      component: ParentPageComponent
    }, {
      path: 'user',
      component: UserPageComponent
    }])
  ],
  declarations: [
    ParentPageComponent,
    UserPageComponent
  ]
})
export class ParentModule {
}
