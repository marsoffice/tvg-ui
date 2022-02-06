import { Severity } from './severity';

export interface NotificationDto {
  id: string;
  userId: string;
  message: string;
  title: string;
  absoluteRouteUrl?: string;
  severity: Severity;
  createdDate: string;
}
