/**
 * Created by richard on 28/11/2016.
 */
import {Action} from '@ngrx/store';

export enum CounterActionTypes {
  INCREMENT = '[Counter] increment'
}

export class IncrementAction implements Action {
  readonly type = CounterActionTypes.INCREMENT;
}

