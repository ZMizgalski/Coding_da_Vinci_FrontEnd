import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appImage]',
  host: {
    '(load)': 'onImageLoaded()',
    '(error)': 'onImageError()',
    '[src]': 'currentSrc',
  },
})
export class ImageDirective {
  public currentSrc: string = '';
  public mainImageSrc: string = '';
  @Input('altImage')
  public altImageSrc: string = '';
  private image: HTMLImageElement = new Image();
  public imageLoading: boolean = false;

  @Input('src')
  public set mainImageSrcInput(value: string) {
    this.currentSrc = this.altImageSrc;
    this.imageLoading = true;
    this.image.src = value;
  }
  public get mainImageSrcInput(): string {
    return this.mainImageSrc;
  }

  constructor(private eref: ElementRef<HTMLElement>) {
    this.image.onload = this.onInternalImageLoaded.bind(this);
    this.image.onerror = this.onInternalImageError.bind(this);
  }

  private onInternalImageError() {
    this.currentSrc = this.altImageSrc;
    this.imageLoading = false;
  }

  private onInternalImageLoaded(event: Event) {
    this.currentSrc = this.image.src;
  }

  public onImageLoaded() {
    if (this.currentSrc === this.mainImageSrc) this.imageLoading = false;
  }

  public onImageError() {
    this.currentSrc = this.altImageSrc;
  }

  public addOverlay() {}

  public removeOverlay() {}
}
