import { SizeEnum } from 'src/app/services/resize-handler/interfaces/size.enum';
import { Subscription } from 'rxjs';
import { ResizeService } from './../../services/resize-handler/resize.service';
import { NavItemModel } from '../../utils-components/side-nav/side-nav.component';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('ease', [
      transition(':enter', [style({ opacity: 0 }), animate(100, style({ opacity: 1 }))]),
      transition(':leave', [animate(100, style({ opacity: 0 }))]),
    ]),
    trigger('ease2', [
      transition(':enter', [style({ opacity: 0 }), animate(1000, style({ opacity: 1 }))]),
      transition(':leave', [animate(100, style({ opacity: 0 }))]),
    ]),
  ],
})
export class MainNavComponent implements OnInit, OnDestroy {
  public navExpand = false;
  public cartExpand = false;
  private subscriptions: Subscription[] = [];
  private localIsHeadset = false;

  public get isHeadset(): boolean {
    return this.localIsHeadset;
  }

  public set isHeadset(value: boolean) {
    this.localIsHeadset = value;
  }

  constructor(private resizeService: ResizeService) {}

  public navItems: NavItemModel[] = [
    {
      name: 'Home',
      routerLink: 'home',
    },
    {
      name: 'Collection',
      routerLink: 'collection',
    },
    {
      name: 'Mixer',
      routerLink: 'mixer',
    },
  ];

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.resizeService.modeChanges.subscribe(item => {
        if (item <= SizeEnum.MEDIUM) {
          this.navExpand ? (this.navExpand = false) : '';
          this.cartExpand ? (this.cartExpand = false) : '';
          this.isHeadset = false;
        } else {
          this.isHeadset = true;
        }
      })
    );
  }
}
