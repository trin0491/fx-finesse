import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SerialPortService} from './serial-port.service';
import {MatrixConnect} from './matrix-connect';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [SerialPortService, MatrixConnect]
})
export class MatrixConnectModule {



}
