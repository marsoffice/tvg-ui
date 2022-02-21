export interface OauthCallbackPayload {
  error?: string;
  success: boolean;
  code?: string;
  type: string;
}
