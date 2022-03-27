import { EVENT_WHEN, ImageResponseModel } from './../../models';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  public readonly NORMAL: number = 0;
  public readonly PANORAMIC: number = 1;
  public readonly ULTRA_PANORAMIC: number = 2;

  data: ImageResponseModel[] = [];
  imagesModes: number[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getImagesData().subscribe(data => {
      this.data = data;
    });
  }

  public calcIsPanoramic(image: HTMLImageElement, index: number): void {
    this.imagesModes[index] =
      image.naturalWidth / image.naturalHeight >= 3
        ? this.ULTRA_PANORAMIC
        : image.naturalWidth / image.naturalHeight >= 2
        ? this.PANORAMIC
        : this.NORMAL;
  }

  public trackByTitle(index: number, item: ImageResponseModel): string {
    return item.mainTitle;
  }

  public getCreateDate(item: ImageResponseModel): string {
    const result = item.events.filter(item => item.header === EVENT_WHEN);
    if (result.length === 0) {
      return '';
    }
    return result[0].data;
  }
}
