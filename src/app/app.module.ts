import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatrixConnectModule} from './matrix-connect/matrix-connect.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatrixConnectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
