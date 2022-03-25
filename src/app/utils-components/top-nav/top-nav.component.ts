import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface NavItemModel{
  name: string;
  routerLink?: string;
  rightIcon?: string;
  leftIcon?: string;
}

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavComponent implements OnInit {

  items: NavItemModel[] = [];

  @Input('items')
  public set itemsInput(items: NavItemModel[]){
    this.items = items;
    this.cd.markForCheck();
  }
  public get itemsInput(): NavItemModel[]{
    return this.items;
  }

  constructor(private cd: ChangeDetectorRef, private router: Router) { }


  ngOnInit(): void {

  }

  // navigateAfterClick(item: NavItemModel){
  //   if(!item.routerLink) return;
  //   this.router.navigate([item.routerLink])
  // }

}
