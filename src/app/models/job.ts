export interface Job {
  // Nu se seteaza deloc
  id?: string;
  userId?: string;

  // General
  name: string; // required
  finalFileDurationInMillis?: number;
  trimGracefullyToMaxDuration?: boolean;
  disabled?: boolean;
  cron: string; // required



  // 2. Content
  contentType?: string; //select - contentTypes
  contentTopic?: string; //text
  contentGetLatestPosts?: boolean;
  contentStartDate?: string; //date
  contentMinChars?: number;
  contentMaxChars?: number;
  contentIncludeLinks?: boolean;
  contentMinPosts?: number;
  contentMaxPosts?: number;
  contentTranslateFromLanguage?: string; //select - contentLanguages - translate service
  contentTranslateToLanguage?: string; //select - contentLanguages translate service
  contentNoOfIncludedTopComments?: number;


  // 3. Speech
  speechPitch?: number;
  speechSpeed?: number;
  speechType?: string; //select - speechTypes speechservice
  speechPauseBeforeInMillis?: number;
  speechPauseAfterInMillis?: number;
  speechLanguage?: string; //select - speechLanguages speechservice


  // 4. Audio Background
  audioBackgroundQuality?: number;
  audioBackgroundVolumeInPercent?: number;

  // 5. Video Background
  videoBackgroundResolution?: string; // string // select - allResolutions editor service

  // 6. Text Box
  textFontFamily?: string; // select - fontTypes editor service
  textFontSize?: number;
  textBoxColor?: string; //color
  textBoxOpacity?: number;
  texBoxBorderColor?: string; //color
  textColor?: string;

  // 7. Upload
  disableAutoUpload?: boolean;
  postDescription?: string; //text areea
  editorVideoResolution?: string; // select - allResolutions editor service
  autoUploadTikTokAccounts?: string; // multi select - tikTokAccounts din userSettings
}


