import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ParentAppComponent } from './parent-app.component';
import {StoreModule} from '@ngrx/store';
import {counterReducer} from './counter/reducers/counter-reducer';
import {CounterPageModule} from './counter/counter-page.module';
import {DesktopJsModule} from '../common/desktop-js/desktop-js.module';

@NgModule({
  declarations: [
    ParentAppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CounterPageModule,
    DesktopJsModule,
    StoreModule.forRoot({counter: counterReducer})
  ],
  providers: [],
  bootstrap: [ParentAppComponent]
})
export class ParentAppModule { }
