import { Subscription } from 'rxjs';
import { trigger, animate, style, transition, animation, useAnimation, query } from '@angular/animations';
import { DataService } from 'src/app/services/data.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ImageResponseModel } from 'src/app/models';

const transformAnimation = animation([
  style("*"),
  animate("400ms ease", style({transform: "translateX({{translateX}})", visibility: 'visible'}))
])

@Component({
  selector: 'app-image-browser',
  templateUrl: './image-browser.component.html',
  styleUrls: ['./image-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("moveRight", [
      transition("normal => moved", [
        query(".image-right-animation",[
          useAnimation(transformAnimation, {params:{
            translateX: '100%'
            }})
        ])
      ])
    ]),
    trigger("moveLeft", [
      transition("normal => moved",[
        query(".image-left-animation",[
          useAnimation(transformAnimation, {params:{
            translateX: '-100%'
          }})
        ])
      ])
    ]),
  ]
})
export class ImageBrowserComponent implements OnInit {
  private readonly MAX_BUFFER_SIZE = 20;
  private readonly LOADING_MARGIN = 3;

  private subscriptions: Subscription[] = [];
  public data: ImageResponseModel[] = [];
  public _currentIndex: number = 0;
  public loadedImages: Map<number, HTMLImageElement> = new Map();
  public urlsModels: (string | undefined)[] = []; //from left to right, 3 in total;

  //animations
  public movingLeft: boolean = false;
  public movingRight: boolean = false;


  public set currentIndex(value: number){
    this._currentIndex = value;
    this.loadNearestBlobs();
    this.recalcUrlsModels();
    this.removeOldImages();
    this.cd.markForCheck();
  }

  public get currentIndex(): number{
    return this._currentIndex;
  }
  
  public movingLeftFinished(){
    if(!this.movingLeft) return;
    console.log(this.data);
    console.log(this.loadedImages);
    this.movingLeft = false;
    this.currentIndex = this.getNearestIndex(1);
  }

  public movingRightFinished(){
    if(!this.movingRight) return;
    this.movingRight = false;
    this.currentIndex = this.getNearestIndex(-1);
  }

  constructor(private dataService: DataService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dataService.getImagesData().subscribe(data=>{
      this.data = data;
      this.loadNearestBlobs();
      this.recalcUrlsModels();
    })
  }

  public recalcUrlsModels(){
    this.urlsModels[0] = this.loadedImages.get(this.getNearestIndex(-1))?.src;
    this.urlsModels[1] = this.loadedImages.get(this._currentIndex)?.src;
    this.urlsModels[2] = this.loadedImages.get(this.getNearestIndex(1))?.src;
    this.cd.markForCheck();
  }

  public loadNearestBlobs(){
    for(let i = -this.LOADING_MARGIN; i <= this.LOADING_MARGIN; i++){
      this.loadBlobToMap(this.getNearestIndex(i));
    }
    this.cd.markForCheck();
  }

  public getNearestIndexes(offset = this.LOADING_MARGIN): number[]{
    let indexes: number[] = [];
    for(let i = -offset; i <= offset; i++){
      indexes.push(this.getNearestIndex(i));
    }
    return indexes;
  }

  public getNearestIndex(offset: number): number{
    return (this._currentIndex + 10 * this.data.length + offset) % this.data.length;
  }

  public nextImageClicked(){
    if(this.movingLeft){
      this.movingLeftFinished();
      setTimeout(() => {
        this.movingLeft = true;
        this.cd.markForCheck();
      }, 0);
      return;
    }
    this.movingLeft = true;
    this.cd.markForCheck();
    // this.currentIndex = this.getNearestIndex(1);
  }

  public previousImageClicked(){
    if(this.movingRight){
      this.movingRightFinished();
      setTimeout(() => {
        this.movingRight = true;
        this.cd.markForCheck();
      }, 0);
      return;
    }
    this.movingRight = true;
    this.cd.markForCheck();
    // this.currentIndex = this.getNearestIndex(-1);
  }


  public loadBlobToMap(index: number){
    if(this.loadedImages.has(index)) return;
    let image = new Image();
    image.src = this.data[index].mainImage;
    this.loadedImages.set(index, image);
  }

  public removeOldImages(){
    if(this.loadedImages.size < this.MAX_BUFFER_SIZE) return;
    const itemsToRemoveCount = this.loadedImages.size - this.MAX_BUFFER_SIZE;
    let i = 0;
    let keysToRemove: number[] = []
    for(let key of this.loadedImages.keys()){
      if(i>=itemsToRemoveCount) break;
      keysToRemove.push(key);
      i++;
    }
    keysToRemove.forEach(key=>this.loadedImages.delete(key));
  }
}
