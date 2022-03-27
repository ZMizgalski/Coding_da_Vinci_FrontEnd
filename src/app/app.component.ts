import { ResizeService } from './services/resize-handler/resize.service';
import { Component } from '@angular/core';
import { ResizeEvent } from './services/resize-handler/resize.event';

@Component({
  selector: 'app-root',
  template: `<app-main-nav (resize)="onResize($event)"></app-main-nav>`,
  styles: [
    `
      @import '../styling/all.scss';
      :host {
        @include flex-container;
      }
    `,
  ],
})
export class AppComponent {
  constructor(public resizeService: ResizeService) {}

  public onResize(event: ResizeEvent): void {
    this.resizeService.setSize(event.newRect.width, event.newRect.height);
  }
}
