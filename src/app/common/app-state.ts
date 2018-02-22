import {CounterState} from './counter/counter-state';

export abstract class AppState {

  counter: CounterState;

  static selectCounterState(state: AppState) {
    return state.counter;
  }
}
