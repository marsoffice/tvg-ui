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
  videoBackgroundResolution?: string; // string

  // 6. Text Box
  textFontFamily?: string; // select - fontTypes editor service
  textFontSize?: number;
  textBoxColor?: string; //color
  textBoxOpacity?: number;
  texBoxBorderColor?: string; //color

  // 7. Upload
  disableAutoUpload?: boolean;
  postDescription?: string; //text areea
  editorVideoResolution?: string; // select - allResolutions editor service
  autoUploadTikTokAccounts?: string; // multi select - tikTokAccounts din userSettings
}


