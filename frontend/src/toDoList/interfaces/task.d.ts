import { User } from "./users";
enum PriorityEnum{
    High,
    Medium,
    Low
}

export interface Task{
    id: string;
    assignee_user: User;
    title: string;
    priority: PriorityEnum;
    details: string;
    is_complete: boolean;
    is_accepted: boolean;
    created_at: Date;
  }