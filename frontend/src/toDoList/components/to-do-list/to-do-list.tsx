
import { useState, useEffect } from "react";
import { deleteTask, getTasks, getUsers } from "../../services/apiService";
import { User } from "../../interfaces/users";
import { Task } from "../../interfaces/task";
import AddTaskDialog, { PriorityEnum } from "../add-task-dialog/add-task-dialog";
import { Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import './to-do-list.css'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';






function ToDoList() {
  const [users,setUsers] =  useState<User[]>([]);
  const [tasks,setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask,setselectedTask] = useState<Task>();
  
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
      setTasks(result.tasks);
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
    // fetchTask();
  },[tasks])

  const handleClose = (value: Task) => {
    setOpen(false);
    setIsEditing(false);
    setselectedTask(undefined);
    fetchTask();
    if (value!= undefined && value.title != undefined)
    {
      //this block is for user experience In case the API response takes a long time, provide the data and then overwrite
      const id = -1;
      var newTasks = [...tasks];
      newTasks.push({
        ...value,
        id: id.toString()
      });
      //////////

      setTasks(newTasks);
    }
    
  };
  const handleEditClick =(id) =>()=>{
    
    const inputTask = tasks.find(x=>x.id==id);
    setselectedTask(inputTask);
    setOpen(true);
    setIsEditing(true);
    console.log(id);
    console.log(selectedTask);
  };

  const handleDeleteClick =(id) =>()=>{
    const updateTasks = [...tasks.filter(x => x.id !=id)];
    setTasks(updateTasks);
    deleteTask(id);
    // fetchTask();
   
  
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 140 , headerClassName:'datagrid-column-header'},
    { field: 'title', headerName: 'Name', width: 390, headerClassName:'datagrid-column-header' },
    { field: 'priority_label', headerName: 'Priority', width: 140,  headerClassName:'datagrid-column-header'},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 160,
      headerClassName:'datagrid-column-header',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

    
  return (
    <>
    <h1>To-Do List</h1>
    <Button sx={{
      fontWeight:'bold',
      marginBottom: '4px',
      fontSize:'18px',
      backgroundcolor: 'whitesmoke',
      marginbottom: '3px',
      border:'solid'}} 
      color="primary" 
      onClick={ ()=>{setOpen(true)}}>
      Add New Todo
    </Button>
    
    <div style={{ maxHeight: '500px', width: '100%' }}>
      <DataGrid
       sx={{
        boxShadow: 2,
        border: 2,
        backgroundColor:'whitesmoke',
        fontWeight: 'bold',
        fontSize:'17px',
        color: '#1b201fd1',
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
        '& .datagrid-column-header':
        {
          fontSize:'19px',
          color: 'black',
          fontFamily: 'fantasy',
        }
       
      }}
        rows={tasks}
        autoHeight {...tasks}
        columns={columns}
        initialState={{
          pagination: {
          paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>    

    <AddTaskDialog inputTask={selectedTask} open={open} isEditing = {isEditing} onClose={handleClose} />
    </>
    );
}

export default  ToDoList;