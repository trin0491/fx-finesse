import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AppState} from '../app-state';
import {IncrementAction} from './counter-actions';
import {Store} from '@ngrx/store';
import {CounterState} from './counter-state';
import {Container} from '@morgan-stanley/desktopjs';
import {CONTAINER} from '../desktop-js/container.service';

@Component({
  selector: 'fx-counter',
  template: `
    ﻿<div class="statcard p-a-md m-b">
      <h3 class="statcard-number">{{ count | async }}</h3>
      <span class="statcard-desc">Count</span>
    </div>
    <div>
      <button class="btn btn-primary-outline" (click)="increment()">
        <span class="icon icon-circle-with-plus"></span>Increment
      </button>
      <button class="btn btn-primary-outline" (click)="newWindow()">New Window</button>
      <button class="btn btn-default-outline" (click)="toggleChangeDetection()">{{ changeDetection }}</button>
      <button class="btn btn-default-outline" (click)="detect()">Detect</button>
    </div>
  `,
  styles: []
})
export class CounterComponent {

  count: Observable<number>;
  changeDetection = 'Live';
  private _live = true;

  constructor(private _store: Store<AppState>,
              private _changeDetector: ChangeDetectorRef,
              @Inject(CONTAINER) private _container: Container) {
    this.count = this._store.select(CounterState.selectCounterValue);
  }

  increment() {
    this._store.dispatch(new IncrementAction());
  }

  newWindow() {
    this._container.createWindow('//localhost:4200/child').then(() => {
      console.log('Opened a window');
    });
  }

  toggleChangeDetection() {
    this._live = !this._live;
    this._live ? this._changeDetector.reattach() : this._changeDetector.detach();
    this.changeDetection = this._live ? 'Live' : 'Disabled';
    if (!this._live) {
      this._changeDetector.detectChanges();
    }
  }

  detect() {
    this._changeDetector.detectChanges();
  }
}
