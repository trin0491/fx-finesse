import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: 'parent',
  loadChildren: 'parent/counter/counter-page.module#CounterPageModule'
}, {
  path: 'child',
  loadChildren: 'parent/child/child.module#ChildModule'
}, {
  path: '',
  redirectTo: 'parent',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
