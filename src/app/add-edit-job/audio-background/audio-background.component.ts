import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AudiodownloaderService } from 'src/app/services/audiodownloader.service';

@Component({
  selector: 'app-audio-background',
  templateUrl: './audio-background.component.html',
  styleUrls: ['./audio-background.component.scss']
})
export class AudioBackgroundComponent implements OnInit {
  @Input() job!: FormGroup;
  audioBackgrounds: string[] = [];
  constructor(private audioDownloaderService: AudiodownloaderService) { }

  ngOnInit(): void {
    this.audioDownloaderService.getAudioBackgrounds().subscribe(x => {
      this.audioBackgrounds = x;
    });
  }

}
