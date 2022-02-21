import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TikTokAccount } from '../models/tiktok-account';

@Injectable({
  providedIn: 'root'
})
export class TiktokService {

  constructor(private http: HttpClient) { }

  getAccounts() {
    return this.http.get<TikTokAccount[]>(`/api/tiktok/getAccounts`);
  }

  deleteAccount(authCode: string) {
    return this.http.delete(`/api/tiktok/deleteAccount/${encodeURIComponent(authCode)}`);
  }

  addAccount(payload: TikTokAccount) {
    return this.http.post<TikTokAccount>(`/api/tiktok/addAccount`, payload);
  }
}
