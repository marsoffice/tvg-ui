import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-upload-settings',
  templateUrl: './upload-settings.component.html',
  styleUrls: ['./upload-settings.component.scss']
})
export class UploadSettingsComponent implements OnInit {
  @Input() job!: FormGroup;

  editorVideosResolution: string[] = [];


  constructor(private editorServices: EditorService) { }

  ngOnInit(): void {
    this.editorServices.getAllResolutions().subscribe(rez =>{
      this.editorVideosResolution = rez
    })
  }


}
