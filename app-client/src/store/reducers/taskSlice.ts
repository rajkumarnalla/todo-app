// src/features/data/taskSlice.js

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFilteredTasks, getTasks } from "../../services/taskService";
import { Task } from "../../utils";
import { FilterProps } from "../../components/DataTableFilter";

export const fetchTasks = createAsyncThunk("task/fetchTasks", getFilteredTasks);

interface InitialState {
  loading: boolean;
  tasks: Task[];
  error: string;
  filters: FilterProps
}
const taskState: InitialState = {
  loading: false,
  tasks: [],
  error: "",
  filters: {}
};

const taskSlice = createSlice({
  name: "task",
  initialState: taskState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterProps>) => {
      state.filters = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Request Failed";
      });
  },
});

export const { setFilter } = taskSlice.actions;
export default taskSlice.reducer;
