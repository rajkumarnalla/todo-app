import React, { useEffect, useState } from "react";
import { Button, Grid, Hidden } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../utils/index";
import { getFilteredTasks, getTasks } from "../services/taskService";
import NewTaskDialog from "../components/NewTaskDialog";
import Toast from "../components/Toast";
import EditTaskDialog from "../components/EditTaskDialog";
import { DataTable } from "../components/DataTable";
import DataList from "../components/DataList";
import DataTableFilter from "../components/DataTableFilter";
import DataListFilter from "../components/DataListFilter";
import dayjs from "dayjs";
import { fetchTasks } from "../store/reducers/taskSlice";
import { useAppDispatch, useAppSelector } from "../store";

interface FilterProps {
  [key: string]: string;
}

export default function Tasks() {
  const [open, setOpen] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [toastInfo, setToastInfo] = useState({
    show: false,
    message: "",
    severity: "",
  });
  const [editTask, setEditTask] = useState<Task>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (status?: string) => {
    if (status === 'success') {
      setOpen(false);
      setToastInfo({
        show: true,
        message: "Request Successful",
        severity: "success",
      });
    } else if (status === 'not-updated') {
      setToastInfo({
        show: true,
        message: "Data not modified",
        severity: "info",
      });
    } else if (status === 'close') {
      setOpen(false);
    }
  };

  const handleEditClose = (status?: string) => {
    let message: string, severity: string;

    if (status) {
      if (status === "success") {
        severity = "success";
        message = "Task updated successfully";
      } else if (status === "not-updated") {
        severity = "info";
        message = "Data is not modified";
      } else {
        severity = "error";
        message = "Task update failed, try again!";
      }
      setToastInfo({
        show: true,
        message,
        severity,
      });
    }
    setOpenEditDialog(false);
  };

  const handleToastClose = () => {
    setToastInfo({
      show: false,
      message: "",
      severity: "",
    });
  };

  const handleFailedRequest = () => {
    setToastInfo({
      show: true,
      message: 'Request failed, please try again',
      severity: 'error',
    });
  }

  return (
    <div style={{ padding: "10px" }}>
      {toastInfo.show && <Toast
        open={toastInfo.show}
        message={toastInfo.message}
        severity={toastInfo.severity}
        handleClose={handleToastClose}
      />}

      <Grid container justifyContent="flex-end" style={{marginBottom: '10px'}}
        sx={{position: 'absolute', top: {xs: '64px', sm: '70px', md: '70px', lg: '70px'}, right: '10px'}}>
        <Button variant="outlined" onClick={handleClickOpen}>
          New Task
        </Button>
      </Grid>

      <AllTasks 
        setToastInfo={setToastInfo} 
        setEditTask={setEditTask}
        setOpenEditDialog={setOpenEditDialog}
        showToast={toastInfo.show}
        />

      <NewTaskDialog 
        showDialog={open} 
        handleClose={handleClose} 
        handleFailedRequest={handleFailedRequest}/>

      {editTask && (
        <EditTaskDialog
          showDialog={openEditDialog}
          handleClose={handleEditClose}
          task={editTask}
          handleFailedRequest={handleFailedRequest}
        />
      )}
    </div>
  );
}

export function AllTasks({setToastInfo, setEditTask, setOpenEditDialog, showToast}:any) {
  const {tasks, filters} = useAppSelector(state => state.task)
  const dispatch = useAppDispatch();

  const columnLabels: string[] = ["Title", "Description", "Status", "Due Date"];
  const columns: string[] = ["title", "description", "status", "dueDate"];

  useEffect(() => {
    dispatch(fetchTasks({
      fromDate: filters.fromDate ? dayjs(filters.fromDate, "DD/MM/YYYY").subtract(7, 'day').format("YYYY-MM-DD") : '',
      toDate: filters.toDate ? dayjs(filters.toDate, "DD/MM/YYYY").add(30, 'day').format("YYYY-MM-DD") : ''
    }))
  }, [])

  useEffect(() => {
    if (showToast) {
      dispatch(fetchTasks({
        fromDate: filters.fromDate ? dayjs(filters.fromDate, "DD/MM/YYYY").format("YYYY-MM-DD") : '',
        toDate: filters.toDate ? dayjs(filters.toDate, "DD/MM/YYYY").add(30, 'day').format("YYYY-MM-DD") : '',
        status: filters.status
      }));
    }
  }, [showToast]);

  const handleRowClick = (row: Task) => {
    setEditTask(row);
    setOpenEditDialog(true);
  };

  return (
    <>
      <Hidden only={['md', 'lg']}>
        <DataListFilter filterTasks={params => dispatch(fetchTasks(params))} setToastInfo={setToastInfo}/>
        <DataList
          columnLabels={columnLabels}
          columns={columns}
          data={tasks}
          handleRowClick={handleRowClick}
        />
      </Hidden>
      <Hidden only={['xs', 'sm']}>
        <DataTableFilter filterTasks={params => dispatch(fetchTasks(params))} setToastInfo={setToastInfo}/>
        <DataTable
          columnLabels={columnLabels}
          columns={columns}
          data={tasks}
          handleRowClick={handleRowClick}
        />
      </Hidden>
    </>
  )
}