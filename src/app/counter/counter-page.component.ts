import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fx-counter-page',
  template: `
    <div class="row">
      <div class="col-md-12">
        <h3>Counter Page</h3>
        <fx-counter></fx-counter>
      </div>
    </div>
  `,
  styles: []
})
export class CounterPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
