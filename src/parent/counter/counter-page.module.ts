import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CounterPageComponent} from './counter-page.component';
import {CounterModule} from '../../common/counter/counter.module';
import {SharedModule} from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    CounterModule,
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: CounterPageComponent
    }])
  ],
  declarations: [
    CounterPageComponent
  ]
})
export class CounterPageModule { }
