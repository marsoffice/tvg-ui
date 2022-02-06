import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getAllContentTypes() {
    return this.http.get<string[]>(`/api/content/getAllContentTypes`);
  }
}
