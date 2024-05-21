import { TASK_BASE_URL, Task, TaskStatus, getToken } from "../utils";

interface AuthOptions {
  headers?: object;
  body?: string;
  method?: string;
}

function addAuthToken(options?: AuthOptions) {
  try {
    let token = getToken();
    let headers = {
      Authorization: "Bearer " + token,
    };
    return options
      ? {
          ...options,
          headers: {
            ...options.headers,
            ...headers,
          },
        }
      : { headers };
  } catch (err) {
    throw err;
  }
}

export async function getTasks(): Promise<Task[]> {
  try {
    let uri = TASK_BASE_URL;
    let options = addAuthToken();

    const data = await fetch(uri, options as RequestInit);

    return data.json();
  } catch (err) {
    console.log(err);
    throw Error("Reqest Failed");
  }
}

export async function newTask(payload: Task): Promise<string> {
  try {
    let uri = TASK_BASE_URL;
    let options: AuthOptions = {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };
    options = addAuthToken(options);
    const data = await fetch(uri, options as RequestInit);

    return "success";
  } catch (err) {
    console.log(err);
    throw Error("Reqest Failed");
  }
}

export async function updateTask(
  taskId: number,
  payload: any
): Promise<string> {
  try {
    let uri = TASK_BASE_URL + "/" + taskId;
    let options: AuthOptions = {
      method: "put",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };
    options = addAuthToken(options);
    const data = await fetch(uri, options as RequestInit);

    return "success";
  } catch (err) {
    console.log(err);
    throw Error("Reqest Failed");
  }
}

export async function deleteTask(taskId: number): Promise<string> {
  try {
    let uri = TASK_BASE_URL + "/" + taskId;
    let options: AuthOptions = {
      method: "delete",
    };
    options = addAuthToken(options);
    const data = await fetch(uri, options as RequestInit);

    return "success";
  } catch (err) {
    console.log(err);
    throw Error("Reqest Failed");
  }
}
