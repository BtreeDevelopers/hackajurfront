import Cookies from "universal-cookie";

const baseName = "hackajur_algar";
const COOKIES_KEY = `access_token_${baseName}`;

const cookies = new Cookies(null, { path: "/" });

export const removerTokenCookies = () => {
  cookies.remove(COOKIES_KEY, {
    path: "/",
  });
};

export const obterAccessToken = () => {
  const token = cookies.get(COOKIES_KEY) as string;

  if (token !== null && token !== undefined) {
    return token;
  }
  return false;
};

export const setToken = (token: string) => {
  const TTL_TOKEN_EXPIRA_2_HORAS = new Date(
    new Date().getTime() + 2 * 60 * 60 * 1000
  );

  cookies.set(COOKIES_KEY, token, {
    expires: TTL_TOKEN_EXPIRA_2_HORAS,
    sameSite: true,
  });

  return token;
};
