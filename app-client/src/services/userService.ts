import { USER_BASE_URL, User } from "../utils";
import axiosInstance from "./axiosInstance";

export async function getUsers(): Promise<User[]> {
  try {
    let uri = USER_BASE_URL;
    const {data} = await axiosInstance.get(uri);

    return data;
  } catch (err) {
    throw Error("Reqest Failed");
  }
}

export async function newUser(payload: User): Promise<string> {
  try {
    let uri = USER_BASE_URL;
    const {data} = await axiosInstance.post(uri, payload);

    return "success";
  } catch (err) {
    throw Error("Reqest Failed");
  }
}

export async function deleteUser(taskId: number): Promise<string> {
  try {
    let uri = USER_BASE_URL + "/" + taskId;
    
    await axiosInstance.get(uri);

    return "success";
  } catch (err) {
    throw Error("Reqest Failed");
  }
}
