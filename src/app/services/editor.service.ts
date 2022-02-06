import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private http: HttpClient) { }

  getAllFonts() {
    return this.http.get<string[]>(`/api/editor/getAllFonts`);
  }

  getAllResolutions() {
    return this.http.get<string[]>(`/api/editor/getAllResolutions`);
  }
}
