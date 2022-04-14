import { SizeEnum } from 'src/app/services/resize-handler/interfaces/size.enum';
import { Subscription } from 'rxjs';
import { ResizeService } from './../../services/resize-handler/resize.service';
import { NavItemModel } from '../../utils-components/side-nav/side-nav.component';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
          this.isHeadset = false;
        } else {
          this.isHeadset = true;
        }
      })
    );
  }
}
