import { MixerService } from './../../services/mixer-service/mixer-service.service';
import { MixerCart } from './../../services/mixer-service/interfaces/mixer-cart.interface';
import { trigger, transition, useAnimation, animate, animation, style } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, Renderer2, ViewEncapsulation, OnDestroy, Input, OnInit } from '@angular/core';

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0}),
  animate('{{transition}}')
]);

const hideAnimation = animation([
  animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0}))
]);


@Component({
  selector: 'app-mixer-cart',
  template: `
         <div class="cart-container" #container *ngIf="visible" [@panelState]="{value: 'visible', params: {transform: 'translate3d(100%, 0px, 0px)', transition: '150ms cubic-bezier(0, 0, 0.2, 1)'}}" (@panelState.start)="onAnimationStart($event)" (@panelState.done)="onAnimationEnd($event)">
            <div class="cart-container-header">
              <i class="pi pi-times" (click)="close($event)" (keydown.enter)="close($event)"></i>
            </div>
            <div class="cart-container-content">
              <div class="content-item" *ngFor="let item of cartItems; let i = index">
                <img class="content-item__img" [src]="item.img">
                <div class="content-item-overlay">
                   <p class="overlay__p">{{item.name}}</p>
                </div>
              </div>
              <button class="cart-container-content__button">Combine</button>
            </div>
        </div>`,
  styleUrls: ['./mixer-cart.component.scss'],
  animations: [
    trigger('panelState', [
        transition('void => visible', [
            useAnimation(showAnimation)
        ]),
        transition('visible => void', [
            useAnimation(hideAnimation)
        ])
    ])
],
changeDetection: ChangeDetectionStrategy.OnPush,
encapsulation: ViewEncapsulation.None,
})
export class MixerCartComponent implements OnDestroy, OnInit{

  @Output() onShow: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();
  @Output() visibleChange: EventEmitter<any> = new EventEmitter()
  private _visible: boolean = false;
  public cartItems: MixerCart[] = [];

  @Input() get visible(): boolean {
    return this._visible;
  }

  public set visible(value: boolean) {
    this._visible = value;
  }
  
  constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, private mixerService: MixerService) { }

  ngOnDestroy(): void {
    this.visible = false;
  }

  ngOnInit(): void {
    this.cartItems = this.mixerService.getCartItems;
  }

  show() {
    this.onShow.emit({});
    this.visibleChange.emit(true);
    this.visible = true;
  }

  hide() {
    this.onHide.emit({});
    this.visible = false;
  }

  close(event: Event) {
    this.hide();
    this.visibleChange.emit(false);
    event.preventDefault();
  }

  onAnimationStart(event: any) {
    switch (event.toState) {
        case 'visible':
            this.show();
            break;
    }
  }

  onAnimationEnd(event: any) {
    switch (event.toState) {
        case 'void':
            this.hide();
            break;
    }
  }

}

