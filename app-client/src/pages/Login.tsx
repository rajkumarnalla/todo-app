import { useEffect, useState } from "react";
import * as yup from "yup";
import CustomForm from "../components/CustomForm";
import { Grid, Paper, Typography, Box } from "@mui/material";
import {
  FormElement,
  LoginUser,
  getToken,
  setToken,
  setUserData,
} from "../utils/index";
import { Link } from "react-router-dom";
import { login } from "../services/authService";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const [toastInfo, setToastInfo] = useState({
    show: true,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    let token = getToken();
    if (token) {
      navigate("/");
    }
  }, []);

  const elements: FormElement[] = [
    {
      type: "textfield",
      label: "Email",
      name: "email",
    },
    {
      type: "textfield",
      label: "Password",
      name: "password",
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

  const handleClose = () => {};

  const submitLoginData = async (payload: LoginUser) => {
    try {
      const { data, token: authToken } = await login(payload);
      let token = authToken.split("Bearer ")[1];
      setUserData(data);
      setToken(token);
      navigate("/");
    } catch (err) {
      setToastInfo({
        show: true,
        message: "Login failed, try again",
        severity: "error",
      });
    }
  };

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={6}
        container
        alignItems="center"
        justifyContent="center"
      >
        <Box textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            style={{ color: "dodgerblue" }}
          >
            Todo App
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        container
        alignItems="center"
        justifyContent="center"
      >
        <Paper
          elevation={3}
          style={{ padding: "2rem", width: "80%", maxWidth: "400px" }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            Login
          </Typography>
          <Toast
            open={toastInfo.show}
            message={toastInfo.message}
            severity={toastInfo.severity}
            handleClose={handleToastClose}
          />
          <CustomForm
            elements={elements}
            yupSchema={schema}
            handleFormSubmit={submitLoginData}
          />
          <Link to="/registration">New User</Link>
        </Paper>
      </Grid>
    </Grid>
  );
}
