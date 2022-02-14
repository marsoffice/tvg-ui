import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  constructor(private http: HttpClient) { }

  getAllSpeechTypes(language: string | undefined = undefined) {
    return this.http.get<string[]>(`/api/speech/getAllSpeechTypes${language == null ? '' : '/' + language}`);
  }

  getAllSpeechLanguages() {
    return this.http.get<string[]>(`/api/speech/getAllSpeechLanguages`);
  }

  test(cmd: string) {
    return this.http.get(`/api/speech/test?cmd=${encodeURIComponent(cmd)}`);
  }
}
