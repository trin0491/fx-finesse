import { Component } from '@angular/core';
import {SerialPortService} from './matrix-connect/serial-port.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fx-finesse';
  ports: Observable<string>;

  constructor(private serialPort: SerialPortService) {
  }

  getPorts(): void {
    this.ports = this.serialPort.getPorts().pipe(
      catchError((err) => {
        return of(err.toString());
      })
    );
  }

  openPort(): void {
     this.ports = this.serialPort.openPort('COM3').pipe(
      catchError((err) => {
        return of(err.toString());
      })
    );
  }

  sendKey(): void {
    this.serialPort.sendKey('A').subscribe(
      () => console.log('sent key'),
      error => console.error('Failed to send key', error)
    );
  }
}
