import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditorService } from 'src/app/services/editor.service';
import { UserSettingsService } from 'src/app/services/user-settings.service';
import { TikTokAccount } from '../../models/tik-tok-account';

@Component({
  selector: 'app-upload-settings',
  templateUrl: './upload-settings.component.html',
  styleUrls: ['./upload-settings.component.scss']
})
export class UploadSettingsComponent implements OnInit {
  @Input() job!: FormGroup;

  editorVideosResolution: string[] = [];

  autoUploadTikTokAccounts: TikTokAccount[] | undefined = [];
 
  constructor(private editorServices: EditorService, private userSettingsService: UserSettingsService) { }

  ngOnInit(): void {
    this.editorServices.getAllResolutions().subscribe(rez =>{
      this.editorVideosResolution = rez
    })

    this.userSettingsService.getUserSettings().subscribe(rez =>{
      this.autoUploadTikTokAccounts = rez.tikTokAccounts
    })
  }

 
}
