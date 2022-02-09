export interface Job {
  // Nu se seteaza deloc
  id?: string;
  userId?: string;

  // General
  name: string; // required
  preferredDurationInSeconds?: number;
  disabled?: boolean;
  cron: string; // required



  // 2. Content
  contentType?: string;
  contentTopic?: string;
  contentGetLatestPosts?: boolean;
  contentStartDate?: string;
  contentMinChars?: number;
  contentMaxChars?: number;
  contentIncludeLinks?: boolean;
  contentMinPosts?: number;
  contentMaxPosts?: number;
  contentTranslateFromLanguage?: string;
  contentTranslateToLanguage?: string;
  contentNoOfIncludedTopComments?: number;


  // 3. Speech
  speechPitch?: number;
  speechSpeed?: number;
  speechType?: string;
  speechPauseBeforeInMillis?: number;
  speechPauseAfterInMillis?: number;


  // 4. Audio Background
  audioBackgroundQuality?: number;
  audioBackgroundVolumeInPercent?: number;

  // 5. Video Background
  videoBackgroundResolution?: string;

  // 6. Text Box
  textFontFamily?: string;
  textFontSize?: number;
  textBoxColor?: string;
  textBoxOpacity?: number;
  texBoxBorderColor?: string;

  // 7. Upload
  disableAutoUpload?: boolean;
  postDescription?: string;
  editorVideoResolution?: string;
  autoUploadTikTokAccounts?: string;
}
