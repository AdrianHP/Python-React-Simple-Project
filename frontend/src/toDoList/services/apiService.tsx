import axios from "axios";
import { Task } from "../interfaces/task";

const API_BASE_URL = "http://127.0.0.1:8080"; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const getUsers = async (authToken) => {
  try {
    const response = await apiService.get("/users/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: {}) => {
  try {
    const response = await apiService.post("login/register/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTasks = async (headers) => {
  try {
    const response = await apiService.get("/task/getall/", {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserTasks = async (headers,userId:string) => {
  try {
    const response = await apiService.get("/task/get/usertasks",{
      params: { user_id: String(userId) },
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const addTask = async (headers, task: Task) => {
  try {
    const response = await apiService.post("/task/add/", task, {
      params: { user_id: '2' },
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editTask = async (headers, task: Task) => {
  try {
    const response = await apiService.put("/task/edit/", task, {
      params: { user_id: '2' },
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (headers, id: string) => {
  try {
    const response = await apiService.delete("/task/delete/", {
      params: { task_id: id },
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
