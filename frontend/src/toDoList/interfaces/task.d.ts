import { User } from "./users";
export interface Task {
  id?: string;
  assignee_user?: User | string;
  title?: string;
  priority_label: string;
  priority_level: number;
  details?: string;
  is_complete?: boolean;
  is_accepted?: boolean;
  created_at?: Date;
}
