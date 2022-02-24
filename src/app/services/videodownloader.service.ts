import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideodownloaderService {

  constructor(private http: HttpClient) { }

  getVideoBackgrounds() {
    return this.http.get<string[]>(`/api/videodownloader/videoBackgrounds`);
  }
}
