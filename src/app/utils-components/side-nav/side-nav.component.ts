import { Subscription } from 'rxjs';
import { ResizeService } from '../../services/resize-handler/resize.service';
import { EventEmitter, OnDestroy } from '@angular/core';
import { Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SizeEnum } from 'src/app/services/resize-handler/interfaces/size.enum';

export interface NavItemModel{
  name: string;
  routerLink?: string;
  rightIcon?: string;
  leftIcon?: string;
}

@Component({
  selector: 'app-top-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("transitionHidding",[
      state("void", style({width: 0, overflow: 'hidden'})),
      state("*", style("*")),
      transition("void <=> *", animate("200ms ease"))
    ])
  ]
})
export class SideNavComponent implements OnInit, OnDestroy {

  togglerVisible: boolean = false;
  items: NavItemModel[] = [];
  private subscriptions: Subscription[] = [];

  @Input('items')
  public set itemsInput(items: NavItemModel[]){
    this.items = items;
    this.cd.markForCheck();
  }
  public get itemsInput(): NavItemModel[]{
    return this.items;
  }

  private _navExpanded: boolean = true;

  @Input("navExpanded")
  public set navExpandedInput(value: boolean){
    if(value === this._navExpanded) return;
    this._navExpanded = value;
    this.cd.markForCheck();
  }
  public get navExpandedInput(): boolean{
    return this._navExpanded;
  }

  @Output()
  public navExpandendChange: EventEmitter<boolean> = new EventEmitter();

  public set navExpanded(value: boolean){
    if(value === this._navExpanded) return;
    this._navExpanded = value;
    this.cd.markForCheck();
    this.navExpandendChange.emit(value);
  }

  public get navExpanded(): boolean{
    return this._navExpanded;
  }

  public toggleNavExpansion(){
    this.navExpanded = !this.navExpanded;
  }

  constructor(private cd: ChangeDetectorRef, private router: Router, public resizeService: ResizeService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }


  ngOnInit(): void {
    this.subscriptions.push(
      this.resizeService.modeChanges.subscribe(newSize=>{
        if(newSize <= SizeEnum.MEDIUM){
          this.togglerVisible = true;
        } 
        else{
          this.navExpanded = true;
          this.togglerVisible = false;
        }
        this.cd.markForCheck();
      })
    )
  }

  // navigateAfterClick(item: NavItemModel){
  //   if(!item.routerLink) return;
  //   this.router.navigate([item.routerLink])
  // }

}
