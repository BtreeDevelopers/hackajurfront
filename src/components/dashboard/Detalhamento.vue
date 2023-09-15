<script setup lang="ts">
import { ref, computed } from "vue";
import Card from "./Card.vue";
import Button from "../Button.vue";
import IDivida from "@/models/dividas";
const props = defineProps<{
  divida: IDivida;
}>();

const expandir = ref<string>("");
function selectCard(card: string) {
  expandir.value = expandir.value === card ? "" : card;
}
const status: Record<string, number> = {
  NaoIniciado: 0,
  DividaReconhecida: 1,
  AguardandoNovaProposta: 2,
  PropostaRecebida: 3,
  AguardandoAssinaturas: 4,
  PropostaAprovada: 4,
  PropostaReprovada: 4,
}
const etapaCompleta = computed(() => {
  return status[props.divida.status] || 0
})

</script>

<template>
  <div class="timeline">
    <div class="timeline__item">
      <div class="timeline__card-number" :class="{ etapaCompleta: etapaCompleta >= 1 }">1</div>
      <div class="timeline__card-content">
        <Card title="Conhecimento de dívida" :expandir="expandir === 'conhecimento'" @click="selectCard('conhecimento')">
          <div class="detail-conhecimento">
            <div class="w-full">
              <p class="text">
                Preencha as informações necessárias para reconhecer a dívida e iniciar a negociação dela.
              </p>
            </div>
            <div class="w-full action">
              <Button>Iniciar</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <div class="timeline__step-line">
    </div>
    <div class="timeline__item">
      <div class="timeline__card-number" :class="{ etapaCompleta: etapaCompleta >= 2 }">2</div>
      <div class="timeline__card-content">
        <Card title="Proposta de Renegociação" :expandir="expandir === 'renegocio'" @click="selectCard('renegocio')"
          :disabled-expand="etapaCompleta <= 1">
          <div class="detail-conhecimento">
            <div class="w-full">
              <p class="text">
                Preencha as informações necessárias para verificar as opções de negociação disponíveis.
              </p>
            </div>
            <div class="w-full action">
              <Button>Iniciar</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <div class="timeline__step-line">
    </div>
    <div class="timeline__item">
      <div class="timeline__card-number" :class="{ etapaCompleta: etapaCompleta >= 3 }">3</div>
      <div class="timeline__card-content">
        <Card title="Aceitar/Recusar Proposta" :expandir="expandir === 'proposta'" @click="selectCard('proposta')"
          :disabled-expand="etapaCompleta <= 2">
          <div class="detail-conhecimento">
            <div class="w-full">
              <p class="text">
                Clique para visualizar as propostas recebidas.
              </p>
            </div>
            <div class="w-full action">
              <Button>Visualizar propostas</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <div class="timeline__step-line">
    </div>
    <div class="timeline__item">
      <div class="timeline__card-number" :class="{ etapaCompleta: etapaCompleta >= 4 }">4</div>
      <div class="timeline__card-content">
        <Card title="Assinaturas ao contrato" :expandir="expandir === 'assinatura'" @click="selectCard('assinatura')"
          :disabled-expand="etapaCompleta <= 3">
          <div class="detail-conhecimento">
            <div class="w-full">
              <p class="text">
                Clique para visualizar as propostas recebidas.
              </p>
            </div>
            <div class="w-full action">
              <Button class="mr-5">Assinatura Avalista</Button>
              <Button class="mr-5">Assinatura Fiador</Button>
              <Button>Assinar contrato</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <div class="timeline__step-line">
    </div>
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
      background-color: #D9D9D9;
      text-align: center;
      font-size: 14px;
      color: #055550;
      font-weight: bold;
      line-height: 20px;
      z-index: 1;

      &.etapaCompleta {
        background-color: #055550;
        color: #FFF;
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