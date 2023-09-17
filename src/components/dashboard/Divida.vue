<script setup lang="ts">
import IDivida from "@/models/dividas";
const props = defineProps<{
  divida: IDivida;
  selected?: boolean;
}>();
const emit = defineEmits<{
  select: [id: string];
}>();
const statusList: Record<string, string> = {
  NaoIniciado: "Não Iniciado",
  Iniciado: "Iniciado",
  PropostaSelecionada: "Proposta Selecionada",
  AguardandoAssinaturas: "Aguardando Assinatura(s)",
  AguardandoPagamento: "Aguardando Pagamento",
  FinalizadoCompleto: "Finalizado Completo",
  FinalizadoIncompleto: "Finalizado Incompleto",
};

function formatCurrency(number: number) {
  // Converte o número para uma string com duas casas decimais
  const formattedNumber = number.toFixed(2);

  // Divide a string nas casas inteiras e decimais
  const parts = formattedNumber.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Adiciona pontos como separadores de milhares
  const integerWithSeparators = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  // Retorna a string formatada no formato brasileiro
  return "R$ " + integerWithSeparators + "," + decimalPart;
}
</script>

<template>
  <div
    class="divida"
    :class="{ selected: selected }"
    @click="emit('select', props.divida._id)"
  >
    <p class="produto">{{ props.divida.nome }}</p>
    <p class="status">
      <span>Status:</span> {{ statusList[props.divida.status] }}
    </p>
    <p class="saldo">Saldo devido</p>
    <p class="saldo-card">{{ formatCurrency(props.divida.saldo) }}</p>
    <p class="contrato">Contrato: {{ props.divida.contrato }}</p>
  </div>
</template>

<style scoped lang="scss">
.divida {
  background: linear-gradient(90deg, #055550 0%, #1b7e6c 100%);
  color: #fff;
  padding: 30px;
  margin-right: 20px;
  border-radius: 10px;
  min-width: 240px;
  width: 300px;
  cursor: pointer;

  .produto {
    font-size: 18px;
    font-weight: 700;
  }

  .status {
    font-size: 12px;
    font-weight: 700;

    span {
      color: #fc0;
    }

    margin-bottom: 25px;
  }

  .saldo {
    font-size: 14px;
    font-weight: 500;
  }

  .saldo-card {
    color: #055550;
    background: #fff;
    padding: 9px 30px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 700;
    width: fit-content;
    margin-top: 5px;
  }

  .contrato {
    font-size: 12px;
    margin-top: 5px;
    font-weight: 700;
  }
}

.selected {
  border: 1px solid #000;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.6) 100%
    ),
    linear-gradient(90deg, #055550 0%, #1b7e6c 100%);
}
</style>
