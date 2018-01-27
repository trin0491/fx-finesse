/**
 * Created by richard on 28/11/2016.
 */
import {AppState} from '../app-state';
import {createSelector} from '@ngrx/store';

export abstract class CounterState {
  static readonly selectCounterValue = createSelector(AppState.selectCounterState, (state: CounterState) => state.value);

  value: number;

}

