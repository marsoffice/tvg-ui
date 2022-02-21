import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OauthCallbackPayload } from '../models/oauth-callback-payload';
import { UserSettingsService } from '../services/user-settings.service';
import { ToastService } from '../shared/toast/services/toast.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  panelOpenState = false;
  popupWindow: Window | null = null;

  settingsForm = new FormGroup({
    disableEmailNotifications: new FormControl(false)
  });

  constructor(private userSettingsService: UserSettingsService, private toast: ToastService) { }

  ngOnInit(): void {

    this.userSettingsService.getUserSettings().subscribe(rez => {
      this.settingsForm.patchValue(rez);
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
  clickdelete(poz: number) {
    const list = this.settingsForm.controls.tikTokAccounts.value;
    list.splice(poz, 1);
    this.settingsForm.controls.tikTokAccounts.setValue(list);

  }


  windowMessageListener = (e: MessageEvent<OauthCallbackPayload>) => {
    if (!e.data.type || e.data.type !== 'oauth-callback-payload') {
      return;
    }
    if (!e.data.success) {
      this.toast.showError('Did not receive any code');
      this.popupWindow?.removeEventListener('message', this.windowMessageListener);
      this.popupWindow = null;
      return;
    }
    // TODO
    this.toast.showSuccess('TikTok login successful');
    this.popupWindow?.removeEventListener('message', this.windowMessageListener);
    this.popupWindow = null;
  };

  redirectToTikTok() {
    const csrfState = Math.random().toString(36).substring(2);
    let url = 'https://open-api.tiktok.com/platform/oauth/connect/';
    url += '?client_key=' + environment.ttclientkey;
    url += '&scope=user.info.basic,video.upload';
    url += '&response_type=code';
    url += '&redirect_uri=' + encodeURIComponent(window.location.origin + '/oauth/tiktok/callback');
    url += '&state=' + csrfState;

    this.popupWindow = window.open(url, '_blank');
    this.popupWindow!.addEventListener('message', this.windowMessageListener);
  }
}
