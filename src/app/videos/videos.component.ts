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
  jobId: string | undefined;
  videos: Video[] = [];
  nextRowKey: string | undefined;
  pageSize = 50;
  private _destroy: Subscription[] = [];
  private signalrSub: SignalrObservableWrapper<Video> | undefined;
  statuses = VideoStatus;

  constructor(private route: ActivatedRoute, private videosService: VideosService,
    private confirmService: ConfirmationService,
    private toastService: ToastService, private hubService: HubService) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      this.jobId = x.id;
      this.load();
    });
  }

  load() {
    this.videosService.getJobVideos(this.jobId!, this.pageSize, this.nextRowKey).subscribe({
      next: v => {
        this.videos = [...this.videos, ...v.items];
        this.nextRowKey = v.nextRowKey;
        this.sortVideos();
        this.signalrSub = this.hubService.subscribe<Video>('videoUpdate');
        this._destroy.push(this.signalrSub.observable.subscribe(vid => {
          if (vid.jobId !== this.jobId) {
            return;
          }
          let foundVid = this.videos?.find(x => x.id === vid.id && x.jobId === vid.jobId);
          if (foundVid == null) {
            foundVid = vid;
            this.videos = [foundVid, ...this.videos];
            return;
          }

          foundVid = Object.assign(foundVid, vid);
          this.sortVideos();
          this.videos = [...this.videos];
        }));
      },
      error: e => {
        this.toastService.fromError(e);
      }
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

  private sortVideos() {
    this.videos = this.videos.sort((a, b) => {
      const dateA = a?.createdDate || a?.updatedDate;
      const dateB = b?.createdDate || b?.updatedDate;
      if (dateA == null && dateB == null) {
        return 0;
      }
      if (dateA == null && dateB != null) {
        return -1;
      }
      if (dateA != null && dateB == null) {
        return 1;
      }
      if (dateA! < dateB!) {
        return -1;
      }
      if (dateA! > dateB!) {
        return 1;
      }
      return 0;
    }).reverse();
  }
}
