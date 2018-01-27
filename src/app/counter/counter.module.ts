import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CounterComponent} from './counter.component';
import {RouterModule} from '@angular/router';
import { CounterPageComponent } from './counter-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: 'counter',
      component: CounterPageComponent
    }])
  ],
  declarations: [
    CounterComponent,
    CounterPageComponent
  ]
})
export class CounterModule { }
