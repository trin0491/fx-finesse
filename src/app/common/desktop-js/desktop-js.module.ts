import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {resolveContainer} from '@morgan-stanley/desktopjs';
import {MessageBus} from './message-bus.service';
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
  MessageBus
  ]
})
export class DesktopJsModule { }
