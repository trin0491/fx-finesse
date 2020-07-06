import { Component } from '@angular/core';
import {SerialPortService} from './serialport/serial-port.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fx-finesse';
  ports: Observable<string[]>;

  constructor(private serialPort: SerialPortService) {
  }

  getPorts(): void {
    this.ports = this.serialPort.getPorts().pipe(
      catchError((err) => {
        return of([err.toString()]);
      })
    );
  }
}
