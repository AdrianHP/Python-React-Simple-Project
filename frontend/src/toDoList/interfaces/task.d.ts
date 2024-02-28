import { User } from "./users";
import { PriorityEnum } from "../components/add-task-dialog/add-task-dialog";
export interface Task{
    id?: string;
    assignee_user?: User;
    title?: string;
    priority?: PriorityEnum;
    details?: string;
    is_complete?: boolean;
    is_accepted?: boolean;
    created_at?: Date;
  }