import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EVENT_WHEN, ImageResponseModel, ImageResponseModelWithAnimation } from './../../models';
import { DataService } from 'src/app/services/data.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('ease', [
      transition(':enter', [style({ opacity: 0 }), animate(1000, style({ opacity: 1 }))]),
      transition(':leave', [animate(200, style({ opacity: 0 }))]),
    ]),
  ],
})
export class CollectionComponent implements OnInit {

  public loaded: Subject<boolean> = new Subject();
  private localItems: ImageResponseModelWithAnimation[] = [];

  public set items(data: ImageResponseModelWithAnimation[]) {
    this.localItems = data;
  }

  public get items() {
    return this.localItems;
  }

  constructor(private dataService: DataService, private router: Router) {}

  public makeRoute(id: number): void {
    this.router.navigate(['/details/' + id]);
  }

  private mapAllItemsForAnmiation(data: ImageResponseModel[]): ImageResponseModelWithAnimation[] {
    return data.map(item => ({ item: item, state: 'initial', sizeRatio: 0}));
  }

  ngOnInit(): void {
    this.dataService.getImagesData().subscribe(data => {
      this.localItems = this.mapAllItemsForAnmiation(data);
      this.loaded.next(true);
    });
  }

  public calcSizeRatio(image: HTMLImageElement, index: number): void {
    this.localItems[index].sizeRatio = Math.max(1,Math.floor(image.naturalWidth / image.naturalHeight));
  }

  public trackByTitle(index: number, item: ImageResponseModelWithAnimation): string {
    return item.item.mainTitle;
  }

  public getCreateDate(item: ImageResponseModelWithAnimation): string {
    const result = item.item.events.filter(tmpItem => tmpItem.header === EVENT_WHEN);
    if (result.length === 0) {
      return '';
    }
    return result[0].data;
  }
}
