import { ChangeEventHandler, useEffect, useState } from "react";
import { Button, Dialog, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {DialogTitle} from "@mui/material";
import './add-task-dialog.css'
import { Task } from "../../interfaces/task";
import { addTask } from "../../services/apiService";

export const enum PriorityEnum{
  High,
  Medium,
  Low
}

export interface AddTaskDialogProps {
    open: boolean;
    
    onClose: (value: Task) => void;
  }


function AddTaskDialog(props:AddTaskDialogProps)
{
  const { onClose,  open } = props;
  const [priority, setPriority] = useState<PriorityEnum>(PriorityEnum.Low);
  const [name, setName] = useState<string>("");
   
  const handleClose = () => {
    const newTask = {title: name,priority:priority};
    onClose(newTask);
  };
  const handlePriorityChange = (event: SelectChangeEvent<typeof priority>) => {
    setPriority(event.target.value as PriorityEnum)
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const saveTask =  async () =>{
    const newTask = {title: name,priority:priority};
    await addTask(newTask);
    handleClose();
  };
  
  
  return(
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add New Task 
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
      <CloseIcon />
      </IconButton>
      <div  className="new-task-form">
      <TextField onChange = {handleNameChange} value={name}  label="Name" variant="outlined" />
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
          <InputLabel htmlFor="priority">Priority</InputLabel>
          <Select
            autoFocus
            value={priority}
            onChange={handlePriorityChange}
            label="Priority"
          >
            <MenuItem value={PriorityEnum.Low}>Low</MenuItem>
            <MenuItem value={PriorityEnum.Medium}>Medium</MenuItem>
            <MenuItem value={PriorityEnum.High}>High</MenuItem>
          </Select>
        </FormControl>
        <div className="add-task-button"><Button  onClick={saveTask} variant="contained" color="success"> Add Task</Button></div>
      </div>
    </Dialog>
  );
}
export default AddTaskDialog;