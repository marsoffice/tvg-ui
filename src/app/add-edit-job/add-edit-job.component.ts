import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
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
    finalFileDurationInMillis: new FormControl(),
    trimGracefullyToMaxDuration: new FormControl(),
    disabled: new FormControl(),
    cron: new FormControl(),
    // 2. Content
    contentType: new FormControl(),
    contentTopic: new FormControl(),
    contentGetLatestPosts: new FormControl(),
    contentStartDate: new FormControl(),
    contentMinChars: new FormControl(),
    contentMaxChars: new FormControl(),
    contentIncludeLinks: new FormControl(),
    contentMinPosts: new FormControl(),
    contentMaxPosts: new FormControl(),
    contentTranslateFromLanguage: new FormControl(),
    contentTranslateToLanguage: new FormControl(),
    contentNoOfIncludedTopComments: new FormControl(),
    selectedContent: new FormControl(),
    // 3. Speech
    speechPitch: new FormControl(),
    speechSpeed: new FormControl(),
    speechType: new FormControl(),
    speechPauseBeforeInMillis: new FormControl(),
    speechPauseAfterInMillis: new FormControl(),
    speechLanguage: new FormControl(),
    // 4. Audio Background
    audioBackgroundQuality: new FormControl(),
    audioBackgroundVolumeInPercent: new FormControl(),
    selectedAudioBackground: new FormControl(),

    // 5. Video Background
    videoBackgroundResolution: new FormControl(),
    selectedVideoBackground: new FormControl(),

    // 6. Text Box
    textFontFamily: new FormControl(),
    textFontSize: new FormControl(),
    textBoxColor: new FormControl(),
    textBoxOpacity: new FormControl(),
    textBoxBorderColor: new FormControl(),
    textColor: new FormControl(),

    // 7. Upload
    disabledAutoUpload: new FormControl(),
    postDescription: new FormControl(),
    editorVideoResolution: new FormControl(),
    autoUploadTikTokAccounts: new FormControl()

  })

  id: string | undefined;

  constructor(private jobsService: JobsService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(rez => {
      this.id = rez.id

      if (this.id != null) {
        this.jobsService.getJob(this.id).subscribe(rez => {
          if (rez.autoUploadTikTokAccounts != null) {
            rez.autoUploadTikTokAccounts = (rez.autoUploadTikTokAccounts as any).split(',')
          }
          if (rez.selectedContent != null) {
            rez.selectedContent = JSON.parse(rez.selectedContent)
          }
          this.job.patchValue(rez)
        })
      }
    })

  }

  clickaddjob() {
    if (this.job.value.autoUploadTikTokAccounts != null) {
      this.job.value.autoUploadTikTokAccounts = this.job.value.autoUploadTikTokAccounts.join()
    }
    if (this.job.value.selectedContent != null) {
      this.job.value.selectedContent = JSON.stringify(this.job.value.selectedContent);
    }
    if (this.id == null) {
      //add
      this.jobsService.createJob(this.job.value).subscribe(rez => {
        this.router.navigateByUrl('/jobs')
      })
    } else {
      //edit
      this.jobsService.updateJob(this.id, this.job.value).subscribe(rez => {
        this.router.navigateByUrl('/jobs')
      })
    }

  }

  clickaddrunjob() {
    if (this.job.value.autoUploadTikTokAccounts != null) {
      this.job.value.autoUploadTikTokAccounts = this.job.value.autoUploadTikTokAccounts.join();
    }
    if (this.job.value.selectedContent != null) {
      this.job.value.selectedContent = JSON.stringify(this.job.value.selectedContent);
    }
    if (this.id == null) {
      //add
      this.jobsService.createJob(this.job.value).pipe(
        switchMap(x => this.jobsService.startJob(x.id!).pipe(
          map(z => x)
        ))
      ).subscribe(rez => {
        this.router.navigateByUrl('/jobs/' + rez.id + '/videos');
      });
    } else {
      //edit
      this.jobsService.updateJob(this.id, this.job.value).pipe(
        switchMap(x => this.jobsService.startJob(this.id!))
      ).subscribe(rez => {
        this.router.navigateByUrl('/jobs/' + this.id + '/videos');
      });
    }
  }



}
