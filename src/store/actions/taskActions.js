import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Host = "http://localhost:5000";

export const getAllTasks = createAsyncThunk(
  "tasks/getAllTasks",
  async (filter, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filter).toString();
      const { data } = await axios.get(`${Host}/api/tasks?${queryParams}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (ids, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${Host}/api/deleteTaskByIds`, {
        ids,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (payload, { rejectWithValue }) => {
    const { title, description, dueDate, status, _id } = payload;
    try {
      const { data } = await axios.put(`${Host}/api/task/${_id}`, {
        title,
        description,
        dueDate,
        status,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${Host}/api/task`, {
        ...payload,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
