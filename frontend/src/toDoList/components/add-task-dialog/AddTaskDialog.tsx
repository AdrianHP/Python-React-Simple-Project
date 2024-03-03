import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { Button, Dialog, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {DialogTitle} from "@mui/material";
import './AddTaskDialog.css';
import { Task } from "../../interfaces/task";
import { addTask,editTask } from "../../services/apiService";
import AuthContext from "../../../shared/context/AuthContex";



export interface AddTaskDialogProps {
    open: boolean;
    isEditing:boolean;
    inputTask?:Task;
    onClose: (value?: Task) => void;
  }


function AddTaskDialog(props:AddTaskDialogProps)
{
  const { onClose, isEditing,inputTask, open } = props;
  const [priority, setPriority] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const { authTokens, logoutUser } = useContext(AuthContext);
  
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + String(authTokens.access),
  }; 


  const handleClose = (toSave:boolean) => {
    //If true then I am adding a new task
    if (toSave && isEditing ==false)
    {
      const newTask = {title: name,priority:priority};
      onClose(newTask);
    }
    //im editing, deleting or cancel 
    else
      onClose(undefined);

    setPriority(0);
    setName("");
    
  };
  const handlePriorityChange = (event: SelectChangeEvent<typeof priority>) => {
    setPriority(event.target.value as number)
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const saveTask =  async () =>{
   
    if(isEditing)
    {
      var taskToEdit = {...inputTask}
      taskToEdit.title = name;
      taskToEdit.priority_level = priority;
      await editTask(headers, taskToEdit as Task );
    }
    else
    {
      const newTask = {title: name,priority:priority};
      await addTask(headers,newTask);
    }
      
    handleClose(true);
  };
  
  useEffect( ()=>{
    console.log(inputTask);
     if (inputTask != undefined && isEditing == true)
     {
      setPriority(inputTask.priority_level as number);
      setName(inputTask.title as string)
     }
  },[inputTask])
  
  return(
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {isEditing? (
        <>Edit Task </>
        ):(
        <> Add New Task </> 
        )}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose(false)}
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
            <MenuItem value={2}>Low</MenuItem>
            <MenuItem value={1}>Medium</MenuItem>
            <MenuItem value={0}>High</MenuItem>
          </Select>
        </FormControl>
        <div className="add-task-button"><Button  onClick={saveTask} variant="contained" color="success"> Save</Button></div>
      </div>
    </Dialog>
  );
}
export default AddTaskDialog;