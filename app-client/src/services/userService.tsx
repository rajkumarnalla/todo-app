import { USER_BASE_URL, User } from "../utils";

export async function getUsers(): Promise<User[]> {
  try {
    let uri = USER_BASE_URL;
    const data = await fetch(uri);

    return data.json();
  } catch (err) {
    console.log(err);
    throw Error("Reqest Failed");
  }
}

export async function newUser(payload: User): Promise<string> {
  try {
    let uri = USER_BASE_URL;
    let options: RequestInit = {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await fetch(uri, options);

    return "success";
  } catch (err) {
    console.log(err);
    throw Error("Reqest Failed");
  }
}

export async function deleteUser(taskId: number): Promise<string> {
  try {
    let uri = USER_BASE_URL + "/" + taskId;
    let options: RequestInit = {
      method: "delete",
    };
    const data = await fetch(uri, options);

    return "success";
  } catch (err) {
    console.log(err);
    throw Error("Reqest Failed");
  }
}
