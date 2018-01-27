import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {resolveContainer, Container} from '@morgan-stanley/desktopjs';

export const CONTAINER = new InjectionToken<Container>('desktopJS.Container');

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
  }]
})
export class DesktopJsModule { }
