import { useState } from "react";
import { PriorityEnum, Task } from "../../interfaces/task";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material";
import './add-task-dialog.css'

export interface AddTaskDialogProps {
    open: boolean;
    newTask?: Task;
    onClose: (value?: Task) => void;
  }


function AddTaskDialog(props:AddTaskDialogProps)
{
    const { onClose, newTask, open } = props;
    const [Task,setTask] =  useState<Task>();


    const handleClose = () => {
        onClose(newTask);
      };


    return(
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <div  className="new-task-form">

        </div>
        </Dialog>
    );
}
export default AddTaskDialog;