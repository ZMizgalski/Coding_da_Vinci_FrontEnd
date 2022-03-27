import { MixerCart } from './interfaces/mixer-cart.interface';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class MixerService {
  private data: MixerCart[] = [
    { img: '../../../assets/images/collection/01163900454.jpg', name: '1' },
    { img: '../../../assets/images/collection/01163900454.jpg', name: '2' },
    { img: '../../../assets/images/collection/01163900454.jpg', name: '3' },
  ];

  public get getCartItems(): MixerCart[] {
    return this.data;
  }

  public addImageToMixer(item: MixerCart): void {
    if (this.data.length === 2) {
      return;
    }
    this.data.push(item);
  }

  public deleteItemFromMixer(index: number): void {
    this.data.splice(index, 1);
  }
}
