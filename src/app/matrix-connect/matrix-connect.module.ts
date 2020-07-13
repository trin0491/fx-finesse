import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SerialPortService} from './serial-port.service';
import {MatrixConnectService} from './matrix-connect.service';
import {MatrixConnectProcess} from './matrix-connect-process';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [SerialPortService, MatrixConnectService, MatrixConnectProcess]
})
export class MatrixConnectModule {



}
