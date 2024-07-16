import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreInterface } from './store/model/store.model';
import { selectIsLogin } from './store/selectors/store.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    // this.store.pipe(select(selectIsLogin), take(1)).subscribe((data) => console.log(data))
  }
}
