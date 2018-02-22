import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DesktopJsModule} from './common/desktop-js/desktop-js.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DesktopJsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
