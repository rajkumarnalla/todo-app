import { TASK_BASE_URL, Task, TaskStatus, getToken } from "../utils";
import axiosInstance from "./axiosInstance";

interface AuthOptions {
  headers?: object;
  body?: string;
  method?: string;
}

export async function getTasks(): Promise<Task[]> {
  try {
    let uri = TASK_BASE_URL;
    // let options = addAuthToken();

    // const data = await fetch(uri, options as RequestInit);
    const { data } = await axiosInstance.get(uri);
    return data;
  } catch (err) {
    throw Error("Reqest Failed");
  }
}

export async function getFilteredTasks(payload: any): Promise<Task[]> {
  try {
    let uri = TASK_BASE_URL;
    // let options = addAuthToken();
    Object.keys(payload).forEach((key, index) => {
      if (index === 0) {
        uri += '?' + key + '=' + payload[key]
      } else {
        uri += '&' + key + '=' + encodeURIComponent(payload[key]);
      }
    })

    // const data = await fetch(uri, options as RequestInit);
    const { data } = await axiosInstance.get(uri);
    
    return data;
  } catch (err) {
    throw Error("Reqest Failed");
  }
}

export async function newTask(payload: Task): Promise<string> {
  try {
    let uri = TASK_BASE_URL;
    
    await axiosInstance.post(uri, payload);
    
    return "success";
  } catch (err) {
    throw Error("Reqest Failed");
  }
}

export async function updateTask(
  taskId: number,
  payload: any
): Promise<string> {
  try {
    let uri = TASK_BASE_URL + "/" + taskId;
    
    await axiosInstance.put(uri, payload);
    
    return "success";
  } catch (err) {
    throw Error("Reqest Failed");
  }
}

export async function deleteTask(taskId: number): Promise<string> {
  try {
    let uri = TASK_BASE_URL + "/" + taskId;
    
    await axiosInstance.delete(uri);
    
    return "success";
  } catch (err) {
    throw Error("Reqest Failed");
  }
}
