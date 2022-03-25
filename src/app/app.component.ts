import { ResizeService } from './services/resize-handler/resize.service';
import { Component } from '@angular/core';
import { ResizeEvent } from './services/resize-handler/resize.event';
import { ScreenSubscription } from './services/resize-handler/interfaces/screen-subsccription.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<app-main-nav (resize)="onResize($event)"></app-main-nav>`,
  styles: [`
  @import "../styling/all.scss";
    :host{
      @include flex-container;
    }
  `]
})
export class AppComponent {
  
  private subscription: Subscription | undefined;

  constructor(public resizeService: ResizeService) {}

  public onResize(event: ResizeEvent) {
     this.resizeService.getSize(event.newRect.width, event.newRect.height);
  }

  ngOnInit(): void {
    const screenSubscription: ScreenSubscription = this.resizeService.subscribeToScreenResize();
    this.subscription = screenSubscription.subscription;
  }

  ngOnDestroy(): void {
    this.resizeService.unSubscribeToScreenResize(this.subscription);
  }
}
