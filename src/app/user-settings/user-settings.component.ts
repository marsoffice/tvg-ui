import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { TikTokAccount } from '../models/tiktok-account';
import { TiktokService } from '../services/tiktok.service';
import { UserSettingsService } from '../services/user-settings.service';
import { ToastService } from '../shared/toast/services/toast.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  panelOpenState = false;

  settingsForm = new FormGroup({
    disableEmailNotifications: new FormControl(false)
  });

  tikTokAccounts: TikTokAccount[] | undefined;

  constructor(private userSettingsService: UserSettingsService, private toast: ToastService, private tiktokService: TiktokService) { }

  ngOnInit(): void {

    this.userSettingsService.getUserSettings().subscribe(rez => {
      this.settingsForm.patchValue(rez);
    });

    this.tiktokService.getAccounts().subscribe(x => {
      this.tikTokAccounts = x;
    });

  }

  clickSaveUserSetting() {
    this.userSettingsService.saveUserSettings(this.settingsForm.value).subscribe({
      next: rez => {
        this.toast.showSuccess('User settings saved successfully');
      },
      error: e => {
        this.toast.fromError(e);
      }
    });
  }
  deleteTikTokAccount(accountId: string, poz: number) {
    this.tiktokService.deleteAccount(accountId).subscribe({
      next: () => {
        this.toast.showSuccess('Account deleted');
        this.tikTokAccounts?.splice(poz, 1);
      },
      error: e => {
        this.toast.fromError(e);
      }
    });
  }

  redirectToTikTok() {
    const csrfState = Math.random().toString(36).substring(2);
    let url = 'https://open-api.tiktok.com/platform/oauth/connect/';
    url += '?client_key=' + environment.ttclientkey;
    url += '&scope=user.info.basic,video.upload';
    url += '&response_type=code';
    url += '&redirect_uri=' + encodeURIComponent(window.location.origin + '/api/tiktok/callback');
    url += '&state=' + csrfState;
    location.href = url;
  }
}
