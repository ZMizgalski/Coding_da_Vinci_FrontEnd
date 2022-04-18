import { Subscription, map } from 'rxjs';
import { MixerService } from './../../services/mixer-service/mixer-service.service';
import { MixerCart } from './../../services/mixer-service/interfaces/mixer-cart.interface';
import { trigger, transition, useAnimation, animate, animation, style } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
  OnDestroy,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0 }),
  animate('{{transition}}'),
]);

const hideAnimation = animation([
  animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 })),
]);

@Component({
  selector: 'app-mixer-cart',
  template: ` <div
    class="cart-container"
    #mixerCartContainer
    *ngIf="visible"
    [@panelState]="{
      value: 'visible',
      params: {
        transform: 'translate3d(100%, 0px, 0px)',
        transition: '150ms cubic-bezier(0, 0, 0.2, 1)'
      }
    }"
    (@panelState.start)="onAnimationStart($event)"
    (@panelState.done)="onAnimationEnd($event)"
  >
    <span class="cart-container-header">
      <i class="pi pi-times" (click)="close($event)" (keydown.enter)="close($event)"></i>
    </span>
    <div class="cart-container-content">
      <div
        class="content-item"
        *ngFor="let item of cartItems; let i = index; trackBy: this.trackByName"
      >
        <img class="content-item__img" [src]="item.iconImage" />
        <div class="content-item-overlay">
          <a
            class="content-item-overlay__button content-item-overlay__button-details"
            [routerLink]="'/details/' + item.index"
          >
            Details</a
          >
          <button class="image-overlay__button" (click)="this.deleteItem(item)">
            <i class="pi pi-times"></i>
          </button>
        </div>
      </div>
      <button
        class="cart-container-content__button"
        [ngClass]="{ 'cart-container-content__button--disabled': !this.mixerService.dataMax }"
        [disabled]="!this.mixerService.dataMax"
      >
        Combine
      </button>
    </div>
  </div>`,
  styleUrls: ['./mixer-cart.component.scss'],
  animations: [
    trigger('panelState', [
      transition('void => visible', [useAnimation(showAnimation)]),
      transition('visible => void', [useAnimation(hideAnimation)]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
})
export class MixerCartComponent implements OnDestroy, OnInit {
  @Output() onShow: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();
  @Output() visibleChange: EventEmitter<any> = new EventEmitter();
  private localVisible = false;
  public cartItems: MixerCart[] = [];
  private subscriptions: Subscription[] = [];

  @Input() get visible(): boolean {
    return this.localVisible;
  }

  public set visible(value: boolean) {
    this.localVisible = value;
  }

  constructor(public mixerService: MixerService, private cd: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.visible = false;
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    // this.cartItems = this.mixerService.data;
    this.subscriptions.push(
      this.mixerService.dataChange.subscribe(cartItems => {
        this.cartItems = cartItems;
        this.cd.markForCheck();
      })
    );
  }

  private show(): void {
    this.onShow.emit({});
    this.visibleChange.emit(true);
    this.visible = true;
  }

  private hide(): void {
    this.onHide.emit({});
    this.visible = false;
  }

  public close(event: Event): void {
    this.hide();
    this.visibleChange.emit(false);
    event.preventDefault();
  }

  onAnimationStart(event: any): void {
    switch (event.toState) {
      case 'visible':
        this.show();
        break;
    }
  }

  onAnimationEnd(event: any): void {
    switch (event.toState) {
      case 'void':
        this.hide();
        break;
    }
  }

  public deleteItem(item: MixerCart) {
    this.mixerService.deleteItemFromMixer(item.name);
  }

  public trackByName(index: number, item: MixerCart) {
    return item.name;
  }
}
