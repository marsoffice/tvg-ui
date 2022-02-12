import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RecurrenceType } from 'src/app/shared/cron/models/recurrence-type';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  @Input() job!: FormGroup;

  disabledRectTypes: RecurrenceType[] = [
    RecurrenceType.Second,
    RecurrenceType.Minute
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
