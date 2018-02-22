import {InjectionToken} from '@angular/core';
import {Container} from '@morgan-stanley/desktopjs';
import {Action} from '@ngrx/store';

export const CONTAINER = new InjectionToken<Container>('desktopJS.Container');

export enum DesktopJsActionTypes {
  WINDOW_CREATED = '[DesktopJS] window created'
}

export class WindowCreatedAction implements Action {
  readonly type = DesktopJsActionTypes.WINDOW_CREATED;
}
