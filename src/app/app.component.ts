import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-main-nav></app-main-nav>`,
  styles: [`
  @import "../styling/all.scss";
    :host{
      @include flex-container;
    }
  `]
})
export class AppComponent {}
