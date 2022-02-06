import { TikTokAccount } from './tik-tok-account';

export interface UserSettings {
  rowKey?: string;
  partitionKey?: string;
  eTag?: string;
  tikTokAccounts?: TikTokAccount[];
  disableEmailNotifications?: boolean;
}
