import * as yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { FormElement, Task, getUserData } from "../utils";
import CustomForm from "./CustomForm";
import dayjs from "dayjs";
import { newTask } from "../services/taskService";

interface NewTaskProps {
  showDialog: boolean;
  handleClose: (status?: string) => void;
  handleFailedRequest: () => void;
}

const schema = yup.object().shape({
  title: yup.string().required("First Name is required"),
  description: yup.string(),
  status: yup.string(),
  dueDate: yup.string().required("Due Date is required"),
});

export default function NewTaskDialog({
  showDialog,
  handleClose,
  handleFailedRequest
}: NewTaskProps) {
  const elements: FormElement[] = [
    {
      type: "textfield",
      label: "Title",
      name: "title",
    },
    {
      type: "textfield",
      label: "Description",
      name: "description",
    },
    {
      type: "date",
      label: "Due Date",
      name: "dueDate",
      defaultValue: dayjs(),
    },
  ];

  const handleFormSubmit = async (data: Task) => {
    try {
      await newTask({
        ...data,
        status: "To Do"
      });
      handleClose("success");
    } catch (err) {
      handleFailedRequest();
    }
  };

  return (
    <Dialog open={showDialog} onClose={() => handleClose()}>
      <DialogTitle sx={{ textAlign: "center" }}>Add Task</DialogTitle>
      <DialogContent>
        <CustomForm
          elements={elements}
          yupSchema={schema}
          handleFormSubmit={handleFormSubmit}
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
