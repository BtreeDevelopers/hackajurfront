<script setup lang="ts">
import { ref, computed } from "vue";
import Card from "./Card.vue";
import Button from "../Button.vue";
import IDivida from "@/models/dividas";
import Propostas from "../modais/Propostas.vue";
import QRCode from "../modais/QRCode.vue";
const props = defineProps<{
  divida: IDivida;
}>();

const expandir = ref<string>("");
function selectCard(card: string) {
  expandir.value = expandir.value === card ? "" : card;
}
const status: Record<string, number> = {
  NaoIniciado: 0,
  Iniciado: 0,
  PropostaSelecionada: 1,
  AguardandoAssinaturas: 1,
  AguardandoPagamento: 2,
  FinalizadoCompleto: 2,
  FinalizadoIncompleto: 2,
};
const etapaCompleta = computed(() => {
  return status[props.divida.status] || 0;
});
const modal = ref(false);
const modal2 = ref(false);
function iniciarProcesso() {
  //MUDAR STATUS PARA INICIADO NO BACKEND
  modal.value = true;
}
</script>

<template>
  <QRCode v-model:status="modal2"></QRCode>
  <Propostas v-model:status="modal"></Propostas>
  <div class="timeline">
    <div class="timeline__item">
      <div
        class="timeline__card-number"
        :class="{ etapaCompleta: etapaCompleta >= 1 }"
      >
        1
      </div>
      <div class="timeline__card-content">
        <Card
          title="Proposta de Renegociação"
          :expandir="expandir === 'renegocio'"
          @click="selectCard('renegocio')"
        >
          <div class="detail-conhecimento">
            <div class="w-full">
              <p class="text">
                Preencha as informações necessárias para verificar as opções de
                negociação disponíveis.
              </p>
            </div>
            <div class="w-full action">
              <Button @click="iniciarProcesso">Iniciar</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <div class="timeline__step-line"></div>

    <div class="timeline__item">
      <div
        class="timeline__card-number"
        :class="{ etapaCompleta: etapaCompleta >= 2 }"
      >
        2
      </div>
      <div class="timeline__card-content">
        <Card
          title="Assinaturas ao contrato"
          :expandir="expandir === 'assinatura'"
          @click="selectCard('assinatura')"
          :disabled-expand="etapaCompleta <= 0"
        >
          <div class="detail-conhecimento">
            <div class="w-full">
              <p class="text">Clique para visualizar as propostas recebidas.</p>
            </div>
            <div class="w-full action">
              <Button class="mr-5">Assinatura Fiador</Button>
              <Button>Assinar contrato</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <div class="timeline__step-line"></div>
  </div>
</template>
<style lang="scss">
.detail-conhecimento {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  .text {
    width: 60%;
    color: #02a64c;
    font-size: 14px;
    font-weight: 500;
  }

  .action {
    text-align: end;
  }
}

@media (max-width: 750px) {
  .detail-conhecimento {
    .text {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}

.timeline {
  .timeline__item {
    display: flex;
    position: relative;

    &:first-child:before {
      top: 45px;
    }

    &:before {
      content: "";
      display: block;
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: #ddd;
      left: 19px;
      z-index: 0;
    }

    &:nth-last-child(2):before {
      height: 45px;
    }

    .timeline__card-number {
      flex-shrink: 0;
      margin: 40px 10px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #d9d9d9;
      text-align: center;
      font-size: 14px;
      color: #055550;
      font-weight: bold;
      line-height: 20px;
      z-index: 1;

      &.etapaCompleta {
        background-color: #055550;
        color: #fff;
      }
    }

    .timeline__card-content {
      flex-grow: 1;
      min-width: 0;
    }
  }

  .timeline__step-line {
    height: 32px;
    border-left: 1px solid #dddddd;
    margin-left: 19px;
  }

  .timeline__step-line:last-child {
    display: none;
  }
}
</style>
