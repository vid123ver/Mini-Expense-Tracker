// Axios service functions to handle CRUD operations and fetch dashboard summary metrics from the backend API.
// It manages all the endpoint calls for adding, updating, filtering, and deleting expenses in one place.

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/expenses';

export const getExpenses = async (filters = {}) => {
  const { category, startDate, endDate } = filters;
  const params = {};

  if (category) params.category = category;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const createExpense = async (expenseData) => {
  const response = await axios.post(API_URL, expenseData);
  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await axios.put(`${API_URL}/${id}`, expenseData);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getSummary = async () => {
  const response = await axios.get(`${API_URL}/summary`);
  return response.data;
};