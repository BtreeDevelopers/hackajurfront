import divida from "@/models/dividas";
import { IResponseLogin } from "@/models/user";
import { setToken, removerTokenCookies } from "@/services/tokenService";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    _id: "",
    nome: "",
    email: "",
    cpf_cnpj: "",
    celular: "",
    receberatt: false,
    dataNascimento: "",
    dividas: [] as divida[],
    local: {
      city: "",
      uf: "",
    },
  }),
  actions: {
    setUser(user: IResponseLogin) {
      setToken(user.token);
      this._id = user.user._id;
      this.nome = user.user.nome;
      this.email = user.user.email;
      this.cpf_cnpj = user.user.cpf_cnpj;
      this.celular = user.user.celular;
      this.receberatt = user.user.receberatt;
      this.dataNascimento = user.user.dataNascimento;
      this.dividas = user.dividas;
    },
    clearUser() {
      const copyLocal = { city: this.local.city, uf: this.local.uf };
      this.$reset();
      this.local = copyLocal;
      removerTokenCookies();
      this.$router.push("/sign");
    },
  },
  persist: true,
});
