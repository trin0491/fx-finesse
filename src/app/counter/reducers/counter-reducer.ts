import {CounterState} from '../counter-state';
import {Action} from '@ngrx/store';
import {CounterActionTypes} from '../counter-actions';

const initialState: CounterState = {
  value: 0
};

export function counterReducer(state: CounterState = initialState, action: Action): CounterState {
  switch (action.type) {
    case CounterActionTypes.INCREMENT:
      return {
        value: state.value + 1
      };
    default:
      return state;
  }
}

