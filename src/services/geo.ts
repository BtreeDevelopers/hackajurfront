import axios from "axios";

const http = axios.create({
  baseURL: "https://nominatim.openstreetmap.org/reverse",
});

export function getLocal(lat: number, lon: number) {
  return http({
    method: "get",
    params: {
      format: "json",
      lat,
      lon,
    },
  });
}
