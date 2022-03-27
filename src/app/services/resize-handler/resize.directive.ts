import {
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ResizeEvent } from './resize.event';

@Directive({
  selector: '[resize]',
})
export class ResizeDirective implements OnInit, OnDestroy {
  private observer: ResizeObserver;
  private oldRect?: DOMRectReadOnly;

  @Output()
  public readonly resize;

  public constructor(private readonly element: ElementRef, private readonly zone: NgZone) {
    this.resize = new EventEmitter<ResizeEvent>();
    this.observer = new ResizeObserver(entries => this.zone.run(() => this.observe(entries)));
  }

  public ngOnInit(): void {
    this.observer.observe(this.element.nativeElement);
  }

  public ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private observe(entries: ResizeObserverEntry[]): void {
    const domSize = entries[0];
    const resizedEvent = new ResizeEvent(domSize.contentRect, this.oldRect);
    this.oldRect = domSize.contentRect;
    this.resize.emit(resizedEvent);
  }
}
