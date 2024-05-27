import * as yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { FormElement, Task } from "../utils";
import CustomForm from "./CustomForm";
import { updateTask } from "../services/taskService";
import dayjs from "dayjs";

interface EditTaskProps {
  showDialog: boolean;
  handleClose: (status?: string) => void;
  task: Task;
  handleFailedRequest: () => void;
}

type TaskKeys = "title" | "description" | "status" | "dueDate";

const schema = yup.object().shape({
  title: yup.string().required("First Name is required"),
  description: yup.string(),
  status: yup.string(),
  dueDate: yup.string().required("Due Date is required"),
});

export default function EditTaskDialog({
  showDialog,
  handleClose,
  task,
  handleFailedRequest
}: EditTaskProps) {
  const elements: FormElement[] = [
    {
      type: "textfield",
      label: "Title",
      name: "title",
      defaultValue: task.title,
    },
    {
      type: "textfield",
      label: "Description",
      name: "description",
      defaultValue: task.description,
    },
    {
      type: "select",
      label: "Status",
      name: "status",
      defaultValue: task.status,
      options: [
        {
          label: "To Do",
          value: "To Do",
        },
        {
          label: "In Progress",
          value: "In Progress",
        },
        {
          label: "Done",
          value: "Done",
        },
      ],
    },
    {
      type: "date",
      label: "Due Date",
      name: "dueDate",
      defaultValue: dayjs(task.dueDate),
    },
  ];

  const handleFormSubmit = async (data: Task) => {
    try {
      let keys = Object.keys(data);
      
      let updatedDataKeys = keys.filter((key) => {
        let column: TaskKeys = key as TaskKeys;

        if (column !== "dueDate" && task[column] !== data[column]) {
          return true;
        } else if (
          column === "dueDate" && 
          task.dueDate !== dayjs(data.dueDate).format("DD/MM/YYYY")) 
        {
          return true;
        }
      });

      if (updatedDataKeys.length >= 1) {
        let payload: any = { ...task };
        updatedDataKeys.forEach((key) => {
          let column: TaskKeys = key as TaskKeys;

          payload[key] = data[column];
        });
        delete payload.id;
        delete payload.userId;
        await updateTask(task.id as number, payload);

        handleClose("success");
        return;
      }

    } catch (err) {
      handleFailedRequest()
    }
  };

  return (
    <Dialog open={showDialog} onClose={() => handleClose}>
      <DialogTitle sx={{ textAlign: "center" }}>Update Task</DialogTitle>
      <DialogContent>
        <CustomForm
          elements={elements}
          yupSchema={schema}
          handleFormSubmit={handleFormSubmit}
          handleClose={() => handleClose("not-updated")}
        />
      </DialogContent>
    </Dialog>
  );
}
