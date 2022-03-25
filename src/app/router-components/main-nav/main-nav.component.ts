import { ScreenSubscription } from './../../services/resize-handler/interfaces/screen-subsccription.interface';
import { ResizeService } from './../../services/resize-handler/resize.service';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavItemModel } from './../../utils-components/top-nav/top-nav.component';
import { Component, OnInit } from '@angular/core';
import { SizeEnum } from 'src/app/services/resize-handler/interfaces/size.enum';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  constructor(public resizeService: ResizeService) { }

  navItems: NavItemModel[] = [
    {
      name: "Home",
      routerLink: "home"
    },
    {
      name: "Collection",
      routerLink: "collection"
    },
    {
      name: "Mixer",
      routerLink: "mixer"
    },
    {
      name: "About",
      routerLink: "about"
    }
  ]

}
