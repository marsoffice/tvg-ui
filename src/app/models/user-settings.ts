import { TikTokAccount } from './tik-tok-account';

export interface UserSettings {
  userId?: string;
  tikTokAccounts?: TikTokAccount[];
  disableEmailNotifications?: boolean;
}
