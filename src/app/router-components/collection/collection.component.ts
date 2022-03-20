import { ImageResponseModel } from './../../models';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  data: ImageResponseModel[] = [];
  imagesModes: boolean[] = []; //standard or panoramic 


  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getImagesData().subscribe(data=>{
      this.data = data;
    })
  }

  public calcIsPanoramic(image: HTMLImageElement, index: number): void{
    this.imagesModes[index] = (image.naturalWidth / image.naturalHeight) >= 2;
  }

  public trackByTitle(index: number, item: ImageResponseModel){
    return item.mainTitle;
  }

}
