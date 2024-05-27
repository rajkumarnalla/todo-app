const SERVER_HOST = "http://localhost:4000";

export const AUTH_BASE_URL = SERVER_HOST + "/auth";
export const USER_BASE_URL = SERVER_HOST + "/users";
export const TASK_BASE_URL = SERVER_HOST + "/tasks";

export interface User {
  firstName: string;
  lastName?: string;
  emailId: string;
  password: string;
  role?: string;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
  dueDate?: string;
  userId?: number;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface FormElement {
  type: "textfield" | "select" | "date";
  name: string;
  label: string;
  protected?: boolean;
  options?: any;
  defaultValue?: any;
}

export interface ToastProps {
  open: boolean;
  message: string;
  severity: any;
  handleClose?: () => void;
}

export interface CustomFormProps {
  elements: FormElement[];
  yupSchema: any;
  handleFormSubmit: (data: any) => void;
  handleClose?: (status?: string) => void;
}

export interface LoginUser {
  emailId: string;
  password: string;
}

export function setUserData(data: any) {
  localStorage.setItem("user", JSON.stringify(data));
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserData() {
  const data = localStorage.getItem("user");
  if (data && data !== "") {
    return JSON.parse(data);
  } else {
    return null;
  }
}

export function clearUserData() {
  localStorage.setItem("user", "");
  localStorage.setItem("token", "");
}
