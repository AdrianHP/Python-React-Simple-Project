import { Task } from "./task";
import { User } from "./users";

export interface TaskNote{
    task: Task;
    user: User;
    note: string;
  }