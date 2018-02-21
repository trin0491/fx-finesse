import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {ParentAppComponent} from './parent-app.component';
import {DesktopJsModule} from '../common/desktop-js/desktop-js.module';

@NgModule({
  declarations: [
    ParentAppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DesktopJsModule,
  ],
  bootstrap: [ParentAppComponent]
})
export class ParentAppModule { }
