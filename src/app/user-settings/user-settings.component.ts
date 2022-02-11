import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    tikTokAccounts: new FormControl([]),
    disableEmailNotifications: new FormControl(false)
  })
  
  addTikTokAccount = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    code: new FormControl('')
  })


  constructor(private userSettingsService: UserSettingsService, private toast: ToastService) { }

  ngOnInit(): void {

    this.userSettingsService.getUserSettings().subscribe(rez =>{
      this.settingsForm.patchValue(rez);
    })

  }

  clickSaveUserSetting(){
    this.userSettingsService.saveUserSettings(this.settingsForm.value).subscribe({
      next: rez => {
        this.toast.showSuccess('User settings saved successfully');
      },
      error: e => {
        this.toast.fromError(e);
      }
    })
    

  }


  clickPush(){
    const list = this.settingsForm.controls.tikTokAccounts.value;
    list.push(this.addTikTokAccount.value);
    this.settingsForm.controls.tikTokAccounts.setValue(list);
    this.panelOpenState = true;
  }

  clickdelete(poz: number){
    const list = this.settingsForm.controls.tikTokAccounts.value;
    list.splice(poz, 1);
    this.settingsForm.controls.tikTokAccounts.setValue(list);

  }
}
