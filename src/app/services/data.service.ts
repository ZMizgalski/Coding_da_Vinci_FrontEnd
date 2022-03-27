import { ImageResponseModel } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly URL = `${API_URL}`;

  constructor(private http: HttpClient) {}

  public getImagesData(): Observable<ImageResponseModel[]> {
    return this.http.get<ImageResponseModel[]>(`${API_URL}/getData`);
  }
}
