<script setup lang="ts">
import { ref } from "vue";
import Timeline from "./Timeline.vue";
import Card from "./Card.vue";
const active = ref(2);
const expandir = ref<string>("");
const tamanhoExpansao: Record<string, { size: string; id: number }> = {
  conhecimento: { size: "50px", id: 1 },
  renegocio: { size: "30px", id: 2 },
  proposta: { size: "30px", id: 3 },
  assinatura: { size: "40px", id: 4 },
};
function selectCard(card: string) {
  expandir.value = expandir.value === card ? "" : card;
}
</script>

<template>
  <div class="detalhamento">
    <Timeline
      :active="active"
      class="mr-10"
      :expandir="tamanhoExpansao[expandir]"
    ></Timeline>
    <div class="cards">
      <Card
        class="mb-7"
        title="Conhecimento de dívida"
        :expandir="expandir === 'conhecimento'"
        @click="selectCard('conhecimento')"
      >
        <div class="detail-conhecimento">
          <p class="text">
            Preencha as informações necessárias para verificar as opções de
            negociação disponíveis.
          </p>
          <button class="action">Iniciar</button>
        </div>
      </Card>
      <Card
        class="mb-7"
        title="Proposta de Renegociação"
        :expandir="expandir === 'renegocio'"
        @click="selectCard('renegocio')"
      >
        <div class="detail-conhecimento">
          <p class="text">
            Preencha as informações necessárias para verificar as opções de
            negociação disponíveis.
          </p>
          <button class="action">Iniciar</button>
        </div>
      </Card>
      <Card
        class="mb-7"
        title="Aceitar/Recusar Proposta"
        :expandir="expandir === 'proposta'"
        @click="selectCard('proposta')"
      >
        <div class="detail-conhecimento">
          <p class="text">
            Preencha as informações necessárias para verificar as opções de
            negociação disponíveis.
          </p>
          <button class="action">Iniciar</button>
        </div>
      </Card>
      <Card
        title="Assinaturas ao contrato"
        :expandir="expandir === 'assinatura'"
        @click="selectCard('assinatura')"
      >
        <div class="detail-conhecimento">
          <p class="text">
            Preencha as informações necessárias para verificar as opções de
            negociação disponíveis.
          </p>
          <button class="action">Iniciar</button>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detalhamento {
  height: 100%;
  display: flex;
  .cards {
    display: flex;
    flex-direction: column;
    width: 100%;
    .detail-conhecimento {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      .text {
        width: 60%;
        color: #02a64c;
        font-size: 14px;
        font-weight: 500;
      }
      .action {
        border: none;
        border-radius: 10px;
        background: #fc0;
        color: #1b7e6c;
        font-size: 12px;
        font-weight: 700;
        width: 150px;
        height: 40px;
        cursor: pointer;
        &:hover {
          background: #d8ad00;
        }
        &:active {
          background: #fc0;
        }
      }
    }
  }
}
</style>
