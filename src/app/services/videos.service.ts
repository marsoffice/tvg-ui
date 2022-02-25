import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { VideosList } from '../models/videos-list';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http: HttpClient) { }

  getJobVideos(jobId: string, pageSize: number, nextRowKey?: string) {
    return this.http.get<VideosList>(`/api/videos/getJobVideos/${jobId}?pageSize=${pageSize}${nextRowKey ? ('&nextRowKey=' + nextRowKey) : ''}`);
  }

  deleteVideo(jobId: string, videoId: string) {
    return this.http.delete(`/api/videos/delete/${jobId}/${videoId}`);
  }

  uploadVideo(jobId: string, videoId: string) {
    return this.http.get(`/api/videos/upload/${jobId}/${videoId}`);
  }
}
