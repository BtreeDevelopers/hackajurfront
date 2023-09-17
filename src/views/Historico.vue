<script setup lang="ts">
import ArrowDownGreenIcon from "@/components/icons/ArrowDownGreenIcon.vue";
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
const userStore = useUserStore();
const statusList: Record<string, string> = {
  NaoIniciado: "Não Iniciado",
  Iniciado: "Iniciado",
  PropostaSelecionada: "Proposta Selecionada",
  AguardandoAssinaturas: "Aguardando Assinatura(s)",
  AguardandoPagamento: "Aguardando Pagamento",
  FinalizadoCompleto: "Finalizado Completo",
  FinalizadoIncompleto: "Finalizado Incompleto",
};
function maskMoney(valor: number) {
  const formatoMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatoMoeda.format(valor);
}
const expandir = ref("");
function abrirURL(value: string) {
  window.open(value, "_blank");
}
</script>
<template>
  <div v-if="userStore.dividasHistorico.length === 0">
    <div class="banner mt-3 mx-5">Não tem histórico de negociação.</div>
  </div>
  <div v-else class="historico">
    <div
      class="card"
      :class="{ expanded: expandir === divida._id }"
      v-for="divida in userStore.dividasHistorico"
      :key="divida._id"
      @click="
        expandir === divida._id ? (expandir = '') : (expandir = divida._id)
      "
    >
      <div class="content">
        <div class="texts">
          <p class="titulo">
            {{ divida.nome }}
          </p>
          <p class="status">
            Status:
            <span class="nome-status">{{ statusList[divida.status] }}</span>
          </p>
        </div>
        <ArrowDownGreenIcon
          class="arrow"
          :class="{ 'arrow-rotate': expandir === divida._id }"
        ></ArrowDownGreenIcon>
      </div>
      <div v-if="expandir === divida._id" class="extra">
        <div>
          <p class="contrato">Contrato negociado: {{ divida.contrato }}</p>
          <p class="contrato">
            Valor negociado:
            <span class="saldo">{{ maskMoney(divida.saldo) }}</span>
          </p>
        </div>
        <Button @click.stop="abrirURL(divida.propostaescolhida)"
          >Visualizar contrato</Button
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  border-radius: 10px;
  background: linear-gradient(90deg, #055550 0%, #1b7e6c 100%);
  padding: 40px 50px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
.historico {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  .card {
    border-radius: 10px;
    background: #f0f0f0;

    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
    padding-top: 30px;
    margin-bottom: 20px;
    cursor: pointer;
    .extra {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .contrato {
        color: #055550;
        font-size: 14px;
        font-weight: 500;
        .saldo {
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
    .titulo {
      color: #055550;
      font-size: 18px;
      font-weight: 700;
      margin-right: 40px;
    }
    .status {
      color: #fc0;
      font-size: 12px;
      font-weight: 700;
      .nome-status {
        color: #1b7e6c;
      }
    }
  }
}
</style>
