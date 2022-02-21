import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TikTokAccount } from 'src/app/models/tiktok-account';
import { EditorService } from 'src/app/services/editor.service';
import { TiktokService } from 'src/app/services/tiktok.service';

@Component({
  selector: 'app-upload-settings',
  templateUrl: './upload-settings.component.html',
  styleUrls: ['./upload-settings.component.scss']
})
export class UploadSettingsComponent implements OnInit {
  @Input() job!: FormGroup;

  editorVideosResolution: string[] = [];

  tikTokAccounts: TikTokAccount[] = [];


  constructor(private editorServices: EditorService, private tikTokService: TiktokService) { }

  ngOnInit(): void {
    this.editorServices.getAllResolutions().subscribe(rez => {
      this.editorVideosResolution = rez;
    });

    this.tikTokService.getAccounts().subscribe(x => {
      this.tikTokAccounts = x;
    });
  }


}
