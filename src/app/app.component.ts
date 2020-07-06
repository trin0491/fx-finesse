import { Component } from '@angular/core';
import {SerialPortService} from './serialport/serial-port.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fx-finesse';
  ports = [''];

  constructor(private serialPort: SerialPortService) {
  }

  getPorts(): void {
    this.serialPort.getPorts().then((ports) => {
      this.ports = ports;
    });
  }
}
