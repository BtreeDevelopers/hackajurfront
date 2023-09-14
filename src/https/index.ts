import axios from "axios";
const http = axios.create({
  baseURL: `${process.env.URL_BASE}`,
});

http.interceptors.request.use(async (config: any) => {
  const { useUserStore } = await import("../stores/user");
  const userStore = useUserStore();
  const token = userStore.token;
  if (token) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});
http.interceptors.response.use(
  (l) => l,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.erro === "Token unvalid"
    ) {
      const { useUserStore } = await import("../stores/user");
      const userStore = useUserStore();
      userStore.clearUser();
    }
    return Promise.reject(error);
  }
);

export { http };
