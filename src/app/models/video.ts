import { VideoStatus } from './video-status';

export interface Video {
  id?: string;
  jobId?: string;
  name?: string;
  userId?: string;
  userEmail?: string;
  jobFireDate?: string;
  createdDate?: string;
  updatedDate?: string;
  status?: VideoStatus;
  error?: string;
  finalFileSasUrl?: string;
  createDone?: boolean;
  contentDone?: boolean;
  translationDone?: boolean;
  speechDone?: boolean;
  audioBackgroundDone?: boolean;
  videoBackgroundDone?: boolean;
  stitchDone?: boolean;
  uploadDone?: boolean;

  contentTranslateFromLanguage?: string;
  contentTranslateToLanguage?: string;
}
