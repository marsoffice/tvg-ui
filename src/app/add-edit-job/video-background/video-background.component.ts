import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditorService } from 'src/app/services/editor.service';
import { VideodownloaderService } from 'src/app/services/videodownloader.service';

@Component({
  selector: 'app-video-background',
  templateUrl: './video-background.component.html',
  styleUrls: ['./video-background.component.scss']
})
export class VideoBackgroundComponent implements OnInit {
  @Input() job!: FormGroup;

  videosBackgroundResolution: string[] = [];
  videoBackgrounds: string[] = [];

  constructor(private editorService: EditorService, private videoDownloaderService: VideodownloaderService) { }

  ngOnInit(): void {
    this.editorService.getAllResolutions().subscribe(rez => {
      this.videosBackgroundResolution = rez;
    });

    this.videoDownloaderService.getVideoBackgrounds().subscribe(x => {
      this.videoBackgrounds = x;
    });

  }

}
