import {Component} from '@angular/core';

@Component({
  selector: 'fx-child-page',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <fx-counter></fx-counter>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ChildPageComponent {
}
