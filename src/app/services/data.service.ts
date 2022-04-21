import { ImageResponseModel } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, BehaviorSubject, filter, tap, throwError } from 'rxjs';
import { API_URL } from '../models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly URL = `${API_URL}`;
  private _lastMixedImage: BehaviorSubject<Blob | undefined> = new BehaviorSubject<
    Blob | undefined
  >(undefined);

  public get mixedImageChange(): Observable<Blob> {
    return this._lastMixedImage.pipe(filter(blob => blob != undefined)) as Observable<Blob>;
  }

  public get lastMixedImage(): Blob | undefined {
    return this._lastMixedImage.getValue();
  }

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  public getImagesData(): Observable<ImageResponseModel[]> {
    return this.http.get<ImageResponseModel[]>(`${API_URL}/getData`);
  }

  public getBlobImage(url: string): Observable<SafeUrl> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map(blob => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))),
      catchError(() => {
        return of(url);
      })
    );
  }

  public uploadFiles(urls: string[]): Observable<Blob> {
    let data = new FormData();
    data.append('firstImage', urls[0]);
    data.append('secondImage', urls[1]);
    return this.http
      .post(`${this.URL}/renderImage`, data, { responseType: 'blob' })
      .pipe(tap(blob => this._lastMixedImage.next(blob)));
  }
}
