import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {resolveContainer} from '@morgan-stanley/desktopjs';
import {MessageBusService} from './message-bus.service';
import {CONTAINER} from './container.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [{
    provide: CONTAINER,
    useFactory: () => {
      return resolveContainer();
    }
  },
  MessageBusService
  ]
})
export class DesktopJsModule { }
