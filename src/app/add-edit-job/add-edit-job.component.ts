import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-add-edit-job',
  templateUrl: './add-edit-job.component.html',
  styleUrls: ['./add-edit-job.component.scss']
})
export class AddEditJobComponent implements OnInit {

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
  }

}
