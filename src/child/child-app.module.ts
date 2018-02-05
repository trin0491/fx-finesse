import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DesktopJsModule} from '../common/desktop-js/desktop-js.module';
import {ChildAppComponent} from './child-app.component';
import {CounterModule} from '../common/counter/counter.module';
import {counterReducer} from '../parent/counter/reducers/counter-reducer';
import {StoreModule} from '@ngrx/store';
import {STORE} from '../common/desktop-js/store.service';
import {ChildStore} from './desktop-js/child-store.service';

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
  providers: [{
    provide: STORE,
    useClass: ChildStore
  }],
  bootstrap: [ ChildAppComponent ]
})
export class ChildAppModule { }
