import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SerialPortService} from './serial-port.service';
import {MatrixConnectService} from './matrix-connect.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [SerialPortService, MatrixConnectService]
})
export class MatrixConnectModule {



}
