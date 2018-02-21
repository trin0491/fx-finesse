import {Store, StoreModule} from '@ngrx/store';
import {STORE} from '../common/desktop-js/store.service';
import {ParentStoreService} from './desktop-js/parent-store.service';
import {NgModule} from '@angular/core';
import {counterReducer} from './counter/reducers/counter-reducer';
import {CommonModule} from '@angular/common';
import {NgSharedServiceProvider} from '../common/injector/NgSharedServiceProvider';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({counter: counterReducer})
  ],
  providers: [{
    provide: STORE,
    useClass: ParentStoreService
  }, {
    provide: NgSharedServiceProvider.PARENT_INJECTOR_NAME,
    useValue: 'sharedInjector'
  },
    ...NgSharedServiceProvider.exportExisting('myStore', Store),
    ...NgSharedServiceProvider.shareInjector()
  ],
})
export class SharedModule {

  constructor() {
    console.log('Loaded shared module');
  }
}
