import { AUTH_BASE_URL, LoginUser } from "../utils";

export async function login(payload: LoginUser): Promise<any> {
  try {
    let uri = AUTH_BASE_URL + "/login";
    let options: RequestInit = {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await fetch(uri, options);
    let resp: { data: any; token: string } = { data: {}, token: "" };

    resp.data = await data.json();
    resp.token = data.headers.get("authorization") as string;

    return resp;
  } catch (err) {
    console.log(err);
    throw Error("Reqest Failed");
  }
}

export async function logout(): Promise<any> {
  try {
    let uri = AUTH_BASE_URL + "/logout";
    let options: RequestInit = {
      method: "get",
    };
    await fetch(uri, options);
  } catch (err) {
    console.log(err);
    throw Error("Reqest Failed");
  }
}
