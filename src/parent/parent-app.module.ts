import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ParentAppComponent } from './parent-app.component';
import {StoreModule} from '@ngrx/store';
import {counterReducer} from './counter/reducers/counter-reducer';
import {CounterPageModule} from './counter/counter-page.module';
import {DesktopJsModule} from '../common/desktop-js/desktop-js.module';
import {STORE} from '../common/desktop-js/store.service';
import {ParentStoreService} from './desktop-js/parent-store.service';

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
  providers: [{
    provide: STORE,
    useClass: ParentStoreService
  }],
  bootstrap: [ParentAppComponent]
})
export class ParentAppModule { }
