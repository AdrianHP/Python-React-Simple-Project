
import { useState, useEffect } from "react";
import { getTasks, getUsers } from "../../services/apiService";
import { User } from "../../interfaces/users";
import { Task } from "../../interfaces/task";
import AddTaskDialog, { PriorityEnum } from "../add-task-dialog/add-task-dialog";
import { Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import './to-do-list.css'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

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
            // onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            // onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
];



function ToDoList() {
  const [users,setUsers] =  useState<User[]>([]);
  
  const [tasks,setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  
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
    if (value.title != undefined)
    {
      const id = Math.random() * 10000
      var newTasks = [...tasks];
      newTasks.push({
        ...value,
        id: id.toString()
      });
      setTasks(newTasks);
      console.log(tasks)
    }
  };
    
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

    <AddTaskDialog  open={open} onClose={handleClose} />
    </>
    );
}

export default  ToDoList;