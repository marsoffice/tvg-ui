import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http: HttpClient) { }

  getJobVideos(jobId: string) {
    return this.http.get<Video[]>(`/api/videos/getJobVideos/${jobId}`);
  }

  deleteVideo(jobId: string, videoId: string) {
    return this.http.delete(`/api/videos/delete/${jobId}/${videoId}`);
  }

  uploadVideo(jobId: string, videoId: string) {
    return this.http.get(`/api/videos/upload/${jobId}/${videoId}`);
  }
}
