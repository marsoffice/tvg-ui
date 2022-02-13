import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Video } from '../models/video';
import { VideoStatus } from '../models/video-status';
import { HubService, SignalrObservableWrapper } from '../services/hub.service';
import { VideosService } from '../services/videos.service';
import { ConfirmationService } from '../shared/confirmation/services/confirmation.service';
import { ToastService } from '../shared/toast/services/toast.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, OnDestroy {
  private jobId: string | undefined;
  videos: Video[]  = [];
  private _destroy: Subscription[] = [];
  private signalrSub: SignalrObservableWrapper<any> | undefined;
  statuses = VideoStatus;

  constructor(private route: ActivatedRoute, private videosService: VideosService,
    private confirmService: ConfirmationService,
    private toastService: ToastService, private hubService: HubService) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      this.jobId = x.id;
      this.videosService.getJobVideos(this.jobId!).subscribe({
        next: v => {
          this.videos = v;
          this.signalrSub = this.hubService.subscribe<Video>('videoUpdate');
          this._destroy.push(this.signalrSub.observable.subscribe(vid => {
            let foundVid = this.videos?.find(x => x.id === vid.id && x.jobId === vid.jobId);
            if (foundVid == null) {
              foundVid = {
                id: vid.id,
                jobId: vid.jobId,
                name: vid.name
              };
              this.videos = [foundVid, ...this.videos!];
            }
            foundVid.status = vid.status;
            foundVid.error = vid.error;

            foundVid.contentDone = vid.contentDone;
            foundVid.createDone = vid.createDone;
            foundVid.speechDone = vid.speechDone;
            foundVid.translationDone = vid.translationDone;
            foundVid.contentTranslateFromLanguage = vid.contentTranslateFromLanguage;
            foundVid.contentTranslateToLanguage = vid.contentTranslateToLanguage;
            foundVid.updatedDate = vid.updatedDate;
            foundVid.stitchDone = vid.stitchDone;
            foundVid.finalFileSasUrl = vid.finalFileSasUrl;
            foundVid.audioBackgroundDone = vid.audioBackgroundDone;
            foundVid.videoBackgroundDone = vid.videoBackgroundDone;
            if (this.videos != null) {
              this.videos = [...this.videos!];
            }
          }));
        },
        error: e => {
          this.toastService.fromError(e);
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.signalrSub) {
      this.signalrSub.kill();
    }
    this._destroy.forEach(s => s.unsubscribe());
  }

  deleteVideo(id: string, poz: number) {
    this.confirmService.confirm().subscribe((x) => {
      if (!x) {
        return;
      }
      this.videosService.deleteVideo(this.jobId!, id).subscribe({
        next: () => {
          this.videos?.splice(poz, 1);
          this.toastService.showSuccess('Video deleted');
        },
        error: e => {
          this.toastService.fromError(e);
        }
      });
    });
  }

  uploadVideo(id: string) {
    this.confirmService.confirm().subscribe(x => {
      if (!x) {
        return;
      }
      this.videosService.uploadVideo(this.jobId!, id).subscribe({
        next: () => {
          this.toastService.showSuccess('Video upload queued');
        },
        error: e => {
          this.toastService.fromError(e);
        }
      });
    });
  }
}
