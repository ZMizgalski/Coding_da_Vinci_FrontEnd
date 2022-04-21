import { MixerCart } from './interfaces/mixer-cart.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MixerService {
  public readonly MAX_DATA_SIZE: number = 2;
  public readonly LOCAL_STORAGE_PATH: string = 'mixerCart';

  private dataSubject: BehaviorSubject<MixerCart[]> = new BehaviorSubject<MixerCart[]>([]);

  constructor() {
    this.readFromLocalStorage();
    this.dataChange.subscribe(value => {
      this.writeToLocalStorage(value);
    });
  }

  public readFromLocalStorage() {
    let raw = localStorage.getItem(this.LOCAL_STORAGE_PATH);
    if (!raw) return;
    try {
      let parsedData = JSON.parse(raw);
      if (!Array.isArray(parsedData)) return;
      this.dataSubject.next(parsedData);
    } catch (e) {}
  }

  public writeToLocalStorage(value: MixerCart[] = this.data) {
    localStorage.setItem(this.LOCAL_STORAGE_PATH, JSON.stringify(value));
  }

  public get dataChange(): Observable<MixerCart[]> {
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
    this.dataSubject.next(this.data.filter(item => item.name !== name));
  }

  public clearCart(): void {
    this.dataSubject.next([]);
  }

  public get dataMax(): boolean {
    return this.data.length >= this.MAX_DATA_SIZE;
  }

  public isInMixer(name: string): boolean {
    return this.data.some(item => item.name === name);
  }
}
