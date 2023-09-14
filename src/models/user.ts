import divida from "./dividas";

export interface IResponseLogin {
    token: string,
    user: {
      _id: string,
      nome: string,
      email: string,
      cpf_cnpj: string,
      celular: string,
      receberatt: boolean,
      dataNascimento: string,
    },
    dividas: divida[],
  }