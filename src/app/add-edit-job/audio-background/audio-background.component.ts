import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-audio-background',
  templateUrl: './audio-background.component.html',
  styleUrls: ['./audio-background.component.scss']
})
export class AudioBackgroundComponent implements OnInit {
  @Input() job!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
