import { AUTH_BASE_URL, LoginUser } from "../utils";
import axiosInstance from "./axiosInstance";

export async function login(payload: LoginUser): Promise<any> {
  try {
    let uri = AUTH_BASE_URL + "/login";

    let {data, headers} = await axiosInstance.post(uri, payload);
    let resp: { data: any; token: string } = { data: {}, token: "" };

    resp.data = data;
    resp.token = headers["authorization"] as string;

    return resp;
  } catch (err) {
    throw Error("Reqest Failed");
  }
}

export async function logout(): Promise<any> {
  try {
    let uri = AUTH_BASE_URL + "/logout";

    await axiosInstance(uri);
  } catch (err) {
    throw Error("Reqest Failed");
  }
}
