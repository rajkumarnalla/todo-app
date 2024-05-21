import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { Task } from "../utils/index";
import { getTasks } from "../services/taskService";
import NewTaskDialog from "../components/NewTaskDialog";
import Toast from "../components/Toast";
import EditTaskDialog from "../components/EditTaskDialog";
import { DataTable } from "../components/DataTable";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [toastInfo, setToastInfo] = useState({
    show: true,
    message: "",
    severity: "",
  });
  const [editTask, setEditTask] = useState<Task>();
  const columnLabels: string[] = ["Title", "Description", "Status", "Due Date"];
  const columns: string[] = ["title", "description", "status", "dueDate"];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (status?: string) => {
    setOpen(false);
    fetUserTasks();
  };

  const handleEditClose = (status?: string) => {
    let message: string, severity: string;

    if (status) {
      if (status === "success") {
        fetUserTasks();
        severity = "success";
        message = "Task updated successfully";
      } else if (status === "not-updated") {
        severity = "info";
        message = "Data is not modified";
      } else {
        //  if (status === 'failed') {
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

  useEffect(() => {
    fetUserTasks();
  }, []);

  const fetUserTasks = async () => {
    getTasks()
      .then((data: Task[]) => {
        setTasks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRowClick = (row: Task) => {
    setEditTask(row);
    setOpenEditDialog(true);
  };

  return (
    <div style={{ padding: "10px" }}>
      <Toast
        open={toastInfo.show}
        message={toastInfo.message}
        severity={toastInfo.severity}
        handleClose={handleToastClose}
      />

      <Grid container justifyContent="flex-end">
        <Button variant="outlined" onClick={handleClickOpen}>
          New Task
        </Button>
      </Grid>

      <DataTable
        columnLabels={columnLabels}
        columns={columns}
        data={tasks}
        handleRowClick={handleRowClick}
      />

      <NewTaskDialog showDialog={open} handleClose={handleClose} />

      {editTask && (
        <EditTaskDialog
          showDialog={openEditDialog}
          handleClose={handleEditClose}
          task={editTask}
        />
      )}
    </div>
  );
}
