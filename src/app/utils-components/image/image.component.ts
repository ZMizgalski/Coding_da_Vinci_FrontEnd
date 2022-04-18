import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image',
  template: `
  <div class="image-wrapper">
    <img class="image" [src]="this.currentSrc" />
    <div class="image-overlay" *ngIf="this.cornerIcon">
      <button class="image-overlay__button" (click)="this.cornerIconClick.emit()">
        <i [class]="'pi ' + this.cornerIconClass"></i>
      </button>
    </div>
  </div>
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
  
  @Output() cornerIconClick: EventEmitter<void> = new EventEmitter();
  @Input() cornerIconClass: string = "pi-plus";
  @Input() cornerIcon: boolean = false;

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
