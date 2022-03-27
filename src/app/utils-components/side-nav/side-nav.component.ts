import { ResizeService } from '../../services/resize-handler/resize.service';
import { EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Output } from '@angular/core';
import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

export interface NavItemModel {
  name: string;
  routerLink?: string;
  rightIcon?: string;
  leftIcon?: string;
}

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0 }),
  animate('{{transition}}'),
]);

const hideAnimation = animation([
  animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 })),
]);

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('panelState', [
      transition('void => visible', [useAnimation(showAnimation)]),
      transition('visible => void', [useAnimation(hideAnimation)]),
    ]),
  ],
})
export class SideNavComponent implements OnInit, OnDestroy {
  private localNavExpanded = true;
  public itemsList: NavItemModel[] = [];
  @Output() onShow: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();
  @Output() expandNavChange: EventEmitter<any> = new EventEmitter();

  @Input() get expandNav(): boolean {
    return this.localNavExpanded;
  }

  public set expandNav(value: boolean) {
    this.localNavExpanded = value;
  }

  @Input('items')
  public set items(items: NavItemModel[]) {
    this.itemsList = items;
    this.cd.markForCheck();
  }

  public get items(): NavItemModel[] {
    return this.itemsList;
  }

  constructor(private cd: ChangeDetectorRef, public resizeService: ResizeService) {}

  private show(): void {
    this.onShow.emit({});
    this.expandNavChange.emit(true);
    this.expandNav = true;
  }

  private hide(): void {
    this.onHide.emit({});
    this.expandNav = false;
  }

  private close(): void {
    this.hide();
    this.expandNavChange.emit(false);
  }

  private open(): void {
    this.show();
    this.expandNavChange.emit(true);
  }

  public toggleNavExpansion(event: any): void {
    this.expandNav ? this.close() : this.open();
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

  ngOnDestroy(): void {
    this.expandNav = false;
  }

  ngOnInit(): void {}
}
