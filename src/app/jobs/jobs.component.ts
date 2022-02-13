import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job';
import { JobsService } from '../services/jobs.service';
import { ToastService } from '../shared/toast/services/toast.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: Job[] = []

  constructor(private jobsService: JobsService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.jobsService.getJobs().subscribe(rez =>{
      this.jobs = rez
    })
  }

  deletejob(id:string | undefined, poz:number){
   this.jobsService.deleteJob(id!).subscribe(rez =>{
     this.jobs.splice(poz,1)
   })

  }

  stringToList(x: string | undefined) {
    if (x == null || x === '') {
      return [];
    }
    return x.split(',');
  }

  startJob(id:string | undefined){
    this.jobsService.startJob(id!).subscribe({
      next: () => {
        this.toastService.showSuccess('Job queued');
      },
      error: e => {
        this.toastService.fromError(e);
      }
    });
  }

}
