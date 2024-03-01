import axios from 'axios';
import { Task } from '../interfaces/task';

const API_BASE_URL = 'http://127.0.0.1:8080'; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});


export const getUsers = async () => {
  try {
    const response = await apiService.get('/users/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await apiService.get('/task/getall/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (task:Task) => {
  try {
    const response = await apiService.post('/task/add/',task);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editTask = async (task:Task) => {
  try {
    const response = await apiService.put('/task/edit/',task);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id:string) => {
  try {
    const response = await apiService.delete('/task/delete/',{params:{ task_id:id}});
    return response.data;
  } catch (error) {
    throw error;
  }
};

