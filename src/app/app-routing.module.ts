import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: 'parent',
  loadChildren: 'app/parent/parent.module#ParentModule'
}, {
  path: 'child',
  loadChildren: 'app/child/child.module#ChildModule'
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
