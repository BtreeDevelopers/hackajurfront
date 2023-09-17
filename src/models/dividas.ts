interface divida {
  _id: string;
  nome: string;
  status: string;
  saldo: number;
  contrato: string;
  userId: string;
  termoconfissaodivida: string;
  propostas: string[];
  propostaescolhida: string;
  forma_de_pagamento: any[];
}
export default divida;
