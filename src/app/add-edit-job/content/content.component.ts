import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ContentService } from 'src/app/services/content.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() job!: FormGroup;

  contentTypes: string[] = [];

  allLanguages: string[] = [];

  constructor(private contentTypeServices: ContentService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.contentTypeServices.getAllContentTypes().subscribe(rez =>{
      this.contentTypes = rez
    })

    this.translateService.getAllLanguages().subscribe(rez =>{
      this.allLanguages = rez
    })


  }

  addSentenceFromInput(event: MatChipInputEvent) {
    if (event.value) {
      let list = this.job.get('selectedContent')!.value;
      if (list == null) {
        list = [];
      }
      list.push(event.value);
      this.job.get('selectedContent')!.setValue(list);
      event.chipInput!.clear();
    }
  }

  removeSentence(i: number) {
    const list = this.job.get('selectedContent')!.value;
    list.splice(i, 1);
    this.job.get('selectedContent')!.setValue(list);
  }

}
