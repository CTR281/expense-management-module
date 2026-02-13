export type NotificationType = "error" | "success";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}
