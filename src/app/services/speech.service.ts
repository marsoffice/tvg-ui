import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  constructor(private http: HttpClient) { }

  getAllSpeechTypes() {
    return this.http.get<string[]>(`/api/speech/getAllSpeechTypes`);
  }

  getAllSpeechLanguages() {
    return this.http.get<string[]>(`/api/speech/getAllSpeechLanguages`);
  }
}
