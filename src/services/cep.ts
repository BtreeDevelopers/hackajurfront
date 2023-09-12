import axios from "axios";

const http = axios.create({
  baseURL: "https://brasilapi.com.br/api/cep/v1/",
});

export function getLocal(cep: string) {
  return http({
    method: "get",
    url: cep,
  });
}
