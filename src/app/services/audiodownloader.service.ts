import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudiodownloaderService {

  constructor(private http: HttpClient) { }

  getAudioBackgrounds() {
    return this.http.get<string[]>(`/api/audiodownloader/audioBackgrounds`);
  }
}
