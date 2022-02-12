import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SpeechService } from 'src/app/services/speech.service';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss']
})
export class SpeechComponent implements OnInit {
  @Input() job!: FormGroup;

  speechTypes: string[] = []

  speechLanguages: string[] = []

  constructor(private speechServices: SpeechService) { }

  ngOnInit(): void {
    this.speechServices.getAllSpeechTypes().subscribe(rez =>{
      this.speechTypes = rez 
    })

    this.speechServices.getAllSpeechLanguages().subscribe(rez =>{
      this.speechLanguages = rez
    })
  }

  onSpeechLanguageChange() {
    this.speechServices.getAllSpeechTypes(this.job.controls.speechLanguage.value).subscribe(rez =>{
      this.speechTypes = rez 
    })
  }

}
