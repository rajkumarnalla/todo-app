import { useState } from "react";
import * as yup from "yup";
import CustomForm from "../components/CustomForm";
import { Grid, Paper, Typography } from "@mui/material";
import { FormElement } from "../utils/index";
import { newUser } from "../services/userService";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  emailId: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
});

export default function Registration() {
  const [toastInfo, setToastInfo] = useState({
    show: true,
    message: "",
    severity: "",
  });
  const [userCreated, setUserCreated] = useState<boolean>(false);

  const elements: FormElement[] = [
    {
      type: "textfield",
      label: "First Name",
      name: "firstName",
    },
    {
      type: "textfield",
      label: "Last Name",
      name: "lastName",
    },
    {
      type: "textfield",
      label: "Emaid Id",
      name: "emailId",
    },
    {
      type: "select",
      label: "Role",
      name: "role",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Normal User",
          value: "user",
        },
      ],
    },
    {
      type: "textfield",
      label: "Password",
      name: "password",
      protected: true,
    },
    {
      type: "textfield",
      label: "Confirm Password",
      name: "confirmPassword",
      protected: true,
    },
  ];

  const handleToastClose = () => {
    setToastInfo({
      show: false,
      message: "",
      severity: "",
    });
  };

  const handleFormSubmit = async (data: any) => {
    try {
      await newUser(data);
      setToastInfo({
        show: true,
        message: "New user registered successfully",
        severity: "success",
      });
      setUserCreated(true);
    } catch (err) {
      setToastInfo({
        show: true,
        message: "New user registration failed!",
        severity: "error",
      });
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Toast
        open={toastInfo.show}
        message={toastInfo.message}
        severity={toastInfo.severity}
        handleClose={handleToastClose}
      />
      <Grid item xs={12} sm={6} alignItems={"center"} justifyContent={"center"}>
        <Paper
          elevation={3}
          style={{
            padding: "2rem",
            width: "80%",
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          {!userCreated && <>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              New User
            </Typography>
            <CustomForm
              elements={elements}
              yupSchema={schema}
              handleFormSubmit={handleFormSubmit}
            />
          </>}

          {userCreated && <>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Goto Login Page
            </Typography>
            <Link to="/login">Login</Link>
          </>}
        </Paper>
      </Grid>
    </Grid>
  );
}
