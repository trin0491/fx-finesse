import { Component } from '@angular/core';

@Component({
  selector: 'fx-root',
  template: `
    <div class="container-fluid">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class ParentAppComponent {
}
