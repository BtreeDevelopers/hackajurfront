import status from "@/models/status";
interface divida {
  _id: string;
  nome: string;
  status: status;
  saldo: number;
  contrato: string;
  userId: string;
  termoconfissaodivida: string;
  propostas: string[];
  propostaescolhida: string;
  forma_de_pagamento: any[];
}
export default divida;
