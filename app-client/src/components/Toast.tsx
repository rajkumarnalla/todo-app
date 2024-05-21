import { Snackbar, Alert } from "@mui/material";
import { ToastProps } from "../utils";

const Toast = ({ open, message, severity, handleClose }: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
