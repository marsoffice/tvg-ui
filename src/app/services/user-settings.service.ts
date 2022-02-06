import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSettings } from '../models/user-settings';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private http: HttpClient) { }

  getUserSettings() {
    return this.http.get<UserSettings>(`/api/users/getUserSettings`);
  }

  saveUserSettings(payload: UserSettings) {
    return this.http.post<UserSettings>(`/api/users/saveUserSettings`, payload);
  }
}
