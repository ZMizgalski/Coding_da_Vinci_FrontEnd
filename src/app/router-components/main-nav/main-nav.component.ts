import { NavItemModel } from './../../utils-components/top-nav/top-nav.component';
import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'src/app/services/resize-handler/resize.event';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
