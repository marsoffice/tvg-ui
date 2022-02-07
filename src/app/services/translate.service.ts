import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  getAllLanguages() {
    return this.http.get<string[]>(`/api/translate/getAllLanguages`);
  }
}
