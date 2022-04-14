import { Component, Input, OnInit, ChangeDetectorRef, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  template: `
    <img class="image" [src]="this.currentSrc" />
    <div *ngIf="this.isLoading" class="overlay">
      <i class="pi pi-spinner pi-spin"></i>
    </div>
  `,
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  public currentSrc: string = '';
  public altImageSrc: string = '';
  public internalImage: HTMLImageElement = new Image();
  public isLoading: boolean = false;

  @Input('altSrc')
  public set altImageInput(value: string) {
    this.altImageInput = value;
    this.cd.markForCheck();
  }

  @Input('src')
  public set mainImageInput(value: string) {
    this.internalImage.src = value;
    if (this.internalImage.complete) {
      this.currentSrc = value;
    } else {
      this.currentSrc = this.altImageSrc;
      this.isLoading = true;
    }

    this.cd.markForCheck();
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.internalImage.onload = this.onInternalImageLoaded.bind(this);
    this.internalImage.onerror = this.onInternalImageError.bind(this);
  }

  public onInternalImageLoaded() {
    this.currentSrc = this.internalImage.src;
    this.isLoading = false;
    this.cd.markForCheck();
  }

  public onInternalImageError() {
    this.isLoading = false;
    this.cd.markForCheck();
  }

  public onImageError() {
    if (this.altImageSrc) {
      this.currentSrc = this.altImageSrc;
      this.cd.markForCheck();
    }
  }

  public onImageLoaded() {}
}
