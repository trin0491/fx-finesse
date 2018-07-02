import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {IUser} from './model/User';

@Component({
  selector: 'fx-mock-server',
  template: `
    <div>
      <p>
        mock-server works!
      </p>
      <p class="user-name">{{username | async}}</p>
      <button (click)="onClick()">Click Me</button>
    </div>
  `,
  styles: []
})
export class UserPageComponent implements OnInit {

  username: Observable<string>;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
  }

  onClick() {
    this.username = this._http.get<IUser>('/api/user').pipe(
      map((user) => user.name)
    );
  }

}
