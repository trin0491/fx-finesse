import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SerialPortModule} from './serialport/serial-port.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SerialPortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
