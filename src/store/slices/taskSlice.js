import { createSlice } from "@reduxjs/toolkit";
import {
  getAllTasks,
  deleteTask,
  editTask,
  addTask,
} from "../actions/taskActions";

const emptyPayload = {
  title: "",
  description: "",
  dueDate: "",
  _id: "",
  status: "",
};
const initialState = {
  data: [],
  alert: {
    show: false,
    type: "error",
    message: "",
  },
  isLoading: false,
  dialog: {
    open: false,
    type: "Add",
    data: emptyPayload,
  },
  filter: {
    status: "none",
    sortOrder: "asc",
    sortBy: "createdAt",
  },
};

export const taskSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state.isLoading = true;
    },
    handleAlert: (state, action) => {
      state.alert = { ...state.alert, ...action.payload };
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    showDialog: (state, action) => {
      let data = emptyPayload;
      if (action?.payload?.task) {
        const { title, description, dueDate, status, _id } =
          action.payload.task;
        data = { title, description, dueDate, status, _id };
      }
      state.dialog = {
        ...state.dialog,
        data,
        type: action.payload.type,
        open: true,
      };
    },
    updateForm: (state, action) => {
      state.dialog = {
        ...state.dialog,
        data: { ...state.dialog.data, ...action.payload },
      };
    },
    hideDialog: (state, action) => {
      state.dialog = { ...state.dialog, open: false };
    },
  },
  extraReducers: {
    [getAllTasks.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllTasks.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data;
    },
    [getAllTasks.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.alert = {
        show: true,
        type: "error",
        message: payload?.message,
      };
    },
    [deleteTask.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteTask.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data;
    },
    [deleteTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.alert = {
        show: true,
        type: "error",
        message: payload?.message,
      };
    },
    [editTask.pending]: (state) => {
      state.isLoading = true;
    },
    [editTask.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data;
      state.dialog = {
        ...state.dialog,
        open: false,
        data: emptyPayload,
      };
    },
    [editTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.alert = {
        show: true,
        type: "error",
        message: payload?.message,
      };
    },
    [addTask.pending]: (state) => {
      state.isLoading = true;
    },
    [addTask.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data;
      state.dialog = {
        ...state.dialog,
        open: false,
        data: emptyPayload,
      };
    },
    [addTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.alert = {
        show: true,
        type: "error",
        message: payload?.message,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  handleAlert,
  showLoader,
  showDialog,
  hideDialog,
  updateForm,
  setFilter,
} = taskSlice.actions;

export default taskSlice.reducer;
