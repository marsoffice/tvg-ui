import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-add-edit-job',
  templateUrl: './add-edit-job.component.html',
  styleUrls: ['./add-edit-job.component.scss']
})
export class AddEditJobComponent implements OnInit {
  job = new FormGroup({
  // General
  name: new FormControl('', [Validators.required]), // required
  preferredDurationInSeconds: new FormControl(0), 
  disabled: new FormControl(false),
  cron: new FormControl('', [Validators.required]), // required
  // 2. Content
  contentType: new FormControl(),
  contentTopic: new FormControl(),
  contentGetLatestPosts: new FormControl(false),
  contentStartDate: new FormControl(),
  contentMinChars: new FormControl(0),
  contentMaxChars: new FormControl(0),
  contentIncludeLinks: new FormControl(false),
  contentMinPosts: new FormControl(0),
  contentMaxPosts: new FormControl(0),
  contentTranslateFromLanguage: new FormControl(),
  contentTranslateToLanguage: new FormControl(),
  contentNoOfIncludedTopComments: new FormControl(0),
  // 3. Speech
  speechPitch: new FormControl(0),
  speechSpeed: new FormControl(0),
  speechType: new FormControl(),
  speechPauseBeforeInMillis: new FormControl(0),
  speechPauseAfterInMillis: new FormControl(0),
  speechLanguage: new FormControl(),
  // 4. Audio Background
  audioBackgroundQuality: new FormControl(0),
  audioBackgroundVolumeInPercent: new FormControl(0),
  // 5. Video Background
  videoBackgroundResolution: new FormControl(),
  // 6. Text Box
  textFontFamily: new FormControl(),
  textFontSize: new FormControl(0),
  textBoxColor: new FormControl(),
  textBoxOpacity: new FormControl(0),
  texBoxBorderColor: new FormControl(),
  // 7. Upload
  disableAutoUpload: new FormControl(false),
  postDescription: new FormControl(),
  editorVideoResolution: new FormControl(),
  autoUploadTikTokAccounts: new FormControl()

  })

  id = ''

  constructor(private jobsService: JobsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(rez =>{
           this.id = rez.id
    })

  }

  clickaddjob(){
    if (this.id == null){
   //add
    }else{
   //edit
    }

  }

 

}
