import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get<Job[]>(`/api/jobs/getJobs`);
  }

  getJob(id: string) {
    return this.http.get<Job>(`/api/jobs/getJob/${id}`);
  }

  startJob(id: string) {
    return this.http.get(`/api/jobs/startJob/${id}`);
  }

  createJob(payload: Job) {
    return this.http.post<Job>(`/api/jobs/createJob`, payload);
  }

  updateJob(id:string, payload: Job) {
    return this.http.put<Job>(`/api/jobs/updateJob/${id}`, payload);
  }

  deleteJob(id: string) {
    return this.http.delete(`/api/jobs/deleteJob/${id}`);
  }
}
