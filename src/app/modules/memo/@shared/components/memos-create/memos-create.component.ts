import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memos-create',
  templateUrl: './memos-create.component.html',
  styleUrl: './memos-create.component.scss'
})
export class MemosCreateComponent {

  constructor(
    private router: Router
  ) { }

  public backTo() {
    const memoElement = document.querySelector('.create_memo');
    const navigateToMemo = () => this.router.navigate(['/memo']);
  
    if (memoElement) {
      memoElement.classList.add('close_animation');
      memoElement.addEventListener('animationend', navigateToMemo, { once: true });
    } else {
      navigateToMemo();
    }
  }
}
