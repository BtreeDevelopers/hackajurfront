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
