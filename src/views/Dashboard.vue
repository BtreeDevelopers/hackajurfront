<script setup lang="ts">
import Dividas from "@/components/dashboard/Dividas.vue";
import Produtos from "@/components/dashboard/Produtos.vue";
import Detalhamento from "@/components/dashboard/Detalhamento.vue";
import { ref } from "vue";
const dividas = [
  {
    _id: "1",
    produto: "Internet Fibra",
    status: "Não iniciado",
    saldo: 300,
    contrato: "48JEH1238",
  },
  {
    _id: "2",
    produto: "Internet Fibra",
    status: "Não iniciado",
    saldo: 300,
    contrato: "48JEH1238",
  },
];
const selected = ref("");
</script>

<template>
  <div class="dashboard">
    <Dividas :dividas="dividas" v-model:selected="selected"></Dividas>
    <Produtos v-if="!selected"></Produtos>
    <Detalhamento v-else></Detalhamento>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
}
</style>
