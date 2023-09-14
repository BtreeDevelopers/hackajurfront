import status from "@/models/status"
export default interface divida{
        nome: string,
        status: status,
        saldo: number,
        contrato: string,
        userId: string,
        termoconfissaodivida: string,
        propostas: string[],
        propostaescolhida: string,
        forma_de_pagamento: any[],
      
}