import { http } from "@/https";

export async function login<T = any>(body: {
  cpf: string;
  senha: string;
}): Promise<T> {
  const { data } = await http({
    data: body,
    method: "post",
    url: "/login",
  });
  return data as T;
}

export async function createaccount<T = any>(
  body: Record<string, string | boolean>
): Promise<T> {
  const { data } = await http({
    data: body,
    method: "post",
    url: "/user",
  });
  return data as T;
}
export async function cities<T = any>(city: string): Promise<T> {
  const { data } = await http({
    method: "get",
    url: "/cities/" + city,
  });
  return data as T;
}
export async function getDividas<T = any>(): Promise<T> {
  const { data } = await http({
    method: "get",
    url: "/divida",
  });
  return data as T;
}
export async function getUserDetail<T = any>(id: string): Promise<T> {
  const { data } = await http({
    method: "get",
    url: "/user/users/id/" + id,
  });
  return data as T;
}
export async function updateUser<T = any>(payload: FormData): Promise<T> {
  const { data } = await http({
    method: "post",
    url: "/user/editaccount",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data as T;
}
