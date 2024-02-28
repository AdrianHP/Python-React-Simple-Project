import axios from 'axios';

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
    const response = await apiService.get('/users/');
    return response.data;
  } catch (error) {
    throw error;
  }
};