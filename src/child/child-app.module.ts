import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DesktopJsModule} from '../common/desktop-js/desktop-js.module';
import {ChildAppComponent} from './child-app.component';
import {CounterModule} from '../common/counter/counter.module';
import {counterReducer} from '../parent/counter/reducers/counter-reducer';
import {StoreModule} from '@ngrx/store';

@NgModule({
  declarations: [
    ChildAppComponent
  ],
  imports: [
    BrowserModule,
    DesktopJsModule,
    CounterModule,
    StoreModule.forRoot({counter: counterReducer})
  ],
  providers: [],
  bootstrap: [ ChildAppComponent ]
})
export class ChildAppModule { }
