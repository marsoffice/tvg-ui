import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {
  @Input() job!: FormGroup;

  textsFontFamily: string[] =[]

  constructor(private editorServices: EditorService) { }

  ngOnInit(): void {
    this.editorServices.getAllFonts().subscribe(rez =>{
      this.textsFontFamily = rez 
    })
  }

}
