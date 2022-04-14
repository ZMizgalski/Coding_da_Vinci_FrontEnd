import { ImageResponseModel } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { API_URL } from '../models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly URL = `${API_URL}`;

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

  private createCrossOriginHeader(): HttpHeaders {
    let header = new HttpHeaders();
    header.append('Access-Control-Allow-Origin', 'https://sachsen.museum-digital.de/');
    header.append('Access-Control-Allow-Methods', 'GET');
    header.append('Access-Control-Allow-Headers', 'X-Requested-With,blob');
    // header.append("mode", "no-cors");
    return header;
  }
}
