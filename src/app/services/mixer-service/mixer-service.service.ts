import { MixerCart } from './interfaces/mixer-cart.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MixerService {

  public readonly MAX_DATA_SIZE: number = 2;
  private dataSubject: BehaviorSubject<MixerCart[]> = new BehaviorSubject<MixerCart[]>([
    // { originalImage: '../../../assets/images/collection/01163900454.jpg', name: '1',
    //  iconImage: '../../../assets/images/collection/01163900454.jpg', index: 1},
    // { originalImage: '../../../assets/images/collection/01163900454.jpg', name: '2', 
    //   iconImage: '../../../assets/images/collection/01163900454.jpg', index: 1 },
    // // { img: '../../../assets/images/collection/01163900454.jpg', name: '3' },
  ])

  public get dataChange(): Observable<MixerCart[]>{
    return this.dataSubject;
  }

  public get data(): MixerCart[] {
    return this.dataSubject.getValue();
  }

  public addImageToMixer(item: MixerCart): void {
    if (this.data.length >= this.MAX_DATA_SIZE) {
      return;
    }
    let updatedData = this.data;
    updatedData.push(item);
    this.dataSubject.next(updatedData);
  }

  public deleteItemFromMixer(name: string): void {
    this.dataSubject.next(this.data.filter(item=>item.name!==name));
  }

  public get dataMax():boolean{
    return this.data.length >= this.MAX_DATA_SIZE;
  }

  public isInMixer(name: string): boolean{
    return this.data.some(item=>item.name === name);
  }
}
