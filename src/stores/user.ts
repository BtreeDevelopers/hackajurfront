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
      city: "Uberlândia",
      uf: "MG",
    },
    assinatura: "",
    iniciais: "",
    estadoCivil: "",
    cep: "",
    uf: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    tipo: "",
    complemento: "",
    fotoPerfil: "",
    score: 0,
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
    setAllUser(user: Record<string, any>) {
      this._id = user._id;
      this.nome = user.nome;
      this.email = user.email;
      this.cpf_cnpj = user.cpf_cnpj;
      this.celular = user.celular;
      this.receberatt = user.receberatt;
      this.dataNascimento = user.dataNascimento;
      this.assinatura = user.assinatura || "";
      this.iniciais = user.iniciais || "";
      this.estadoCivil = user.estadoCivil || "";
      this.cep = user.cep || "";
      this.uf = user.uf || "";
      this.cidade = user.cidade || "";
      this.bairro = user.bairro || "";
      this.rua = user.rua || "";
      this.numero = user.numero || "";
      this.tipo = user.tipo || "";
      this.complemento = user.complemento || "";
      this.fotoPerfil = user.fotoPerfil || "";
      this.score = user.score || 0;
    },
    clearUser() {
      const copyLocal = { city: this.local.city, uf: this.local.uf };
      this.$reset();
      this.local = copyLocal;
      removerTokenCookies();
      this.$router.push("/sign");
    },
  },
  getters: {
    isPJ: (state) => state.cpf_cnpj.length === 14,
    dividasAtivas: (state) =>
      state.dividas.filter(
        (el) =>
          el.status !== "FinalizadoCompleto" &&
          el.status !== "FinalizadoIncompleto"
      ),
    dividasHistorico: (state) =>
      state.dividas.filter(
        (el) =>
          el.status === "FinalizadoCompleto" ||
          el.status === "FinalizadoIncompleto"
      ),
  },
  persist: true,
});
