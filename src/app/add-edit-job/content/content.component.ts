import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContentService } from 'src/app/services/content.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() job!: FormGroup;

  contentTypes: string[] = []

  allLanguages: string[] = []


  constructor(private contentTypeServices: ContentService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.contentTypeServices.getAllContentTypes().subscribe(rez =>{
      this.contentTypes = rez 
    })

    this.translateService.getAllLanguages().subscribe(rez =>{
      this.allLanguages = rez
    })


  }

}
