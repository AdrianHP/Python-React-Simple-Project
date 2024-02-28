
import { useState, useEffect } from "react";

import { getUsers } from "../../services/apiService";
import { User } from "../../interfaces/users";
import { Task } from "../../interfaces/task";
import AddTaskDialog from "../add-task-dialog/add-task-dialog";
import { Button, Typography } from "@mui/material";

interface Todo {
    id: string;
    text: string;
  }


function ToDoList() {


    const [users,setUsers] =  useState<User[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

   
    const [newTask,setnewTask] =  useState<Task>();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value?: Task) => {
      setOpen(false);
      setnewTask(value);
    };
    


    async function fetchUsers() {
        try {
          const result = await getUsers();
          setUsers(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      
    useEffect(() => {
      fetchUsers();
      console.log(users);
    }, []);
      
      
      
      const addTodo = () => {
        // Implement the logic to add a new to-do item here
      };
      
      const deleteTodo = (id: string) => {
        // Implement the logic to delete a to-do item here
      };
      
      // Render the list of todos and the input field for adding new todos


    return (
        <>
        <h1>To-Do List</h1>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task" />
        
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
    
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <AddTaskDialog newTask={newTask} open={open} onClose={handleClose} />
    </div>
        </>
    );
    
}

export default  ToDoList;