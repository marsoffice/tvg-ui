import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-video-background',
  templateUrl: './video-background.component.html',
  styleUrls: ['./video-background.component.scss']
})
export class VideoBackgroundComponent implements OnInit {
  @Input() job!: FormGroup;

  videosBackgroundResolution: string[]= []

  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
    this.editorService.getAllResolutions().subscribe(rez =>{
      this.videosBackgroundResolution = rez 
    })

  }

}
