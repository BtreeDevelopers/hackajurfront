import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    taxId: "46456126037",
    email: "teste@teste.com",
    nome: "Teste Silva",
    local: {
      city: "Uberlândia",
      uf: "MG",
    },
  }),
});
