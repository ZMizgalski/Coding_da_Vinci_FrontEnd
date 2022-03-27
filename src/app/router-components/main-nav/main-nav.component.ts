import { NavItemModel } from '../../utils-components/side-nav/side-nav.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  public navExpand = false;
  public cartExpand = false;

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
    {
      name: 'About',
      routerLink: 'about',
    },
  ];
}
