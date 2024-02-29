
import { useState, useEffect } from "react";

import { addTask, getTasks, getUsers } from "../../services/apiService";
import { User } from "../../interfaces/users";
import { Task } from "../../interfaces/task";
import AddTaskDialog, { PriorityEnum } from "../add-task-dialog/add-task-dialog";
import { Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
interface Todo {
    id: string;
    text: string;
  }

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Number', width: 130 },
  { field: 'title', headerName: 'Name', width: 130 },
  { field: 'priority', headerName: 'Priority', width: 130 },
];



function ToDoList() {
  const [users,setUsers] =  useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  
  const [tasks,setTasks] = useState<Task[]>([]);
  const [newTask,setnewTask] =  useState<Task>();
  const [open, setOpen] = useState(false);
  
  var rows =[];
  
  async function fetchUsers() {
    try {
      const result = await getUsers();
      setUsers(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchTask() {
    try {
      const result = await getTasks();
      setTasks(result);
      console.log(tasks)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
     
 
  
  useEffect(() => {
    fetchUsers();
    fetchTask();
  }, []);

  useEffect(()=>{
    rows = Object.entries(tasks).slice(1)
    console.log(rows)
  },tasks)

 
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: Task) => {
    setOpen(false);
    if (value.title != undefined)
    {
      
      var newTasks = tasks;
      newTasks.tasks.push(value);
      
      setTasks(newTasks);
      console.log(tasks)
    }
  };
    



    
    
    
  const addTodo = () => {
    // Implement the logic to add a new to-do item here
  };
  
  const deleteTodo = (id?: string) => {
    // Implement the logic to delete a to-do item here
  };
  
  // Render the list of todos and the input field for adding new todos

  return (
    <>
    <h1>To-Do List</h1>
    {/* <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      placeholder="Add a new task" />
    
    <button onClick={addTodo}>Add</button>
    <ul>
      {tasks.map((todo) => (
        <li key={todo.id}>
          {todo.title}
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul> */}
    
    <div>
  
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Open simple dialog
    </Button>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows  }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>    

    <AddTaskDialog  open={open} onClose={handleClose} />
    </div>
    </>
    );
}

export default  ToDoList;