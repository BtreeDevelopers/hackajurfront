<script setup lang="ts">
import Dividas from "@/components/dashboard/Dividas.vue";
import Produtos from "@/components/dashboard/Produtos.vue";
import Detalhamento from "@/components/dashboard/Detalhamento.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
import { computed, ref } from "vue";

const selected = ref("");
const selectedDetalhe = computed(() => {
  return userStore.dividas.find((divida) => divida._id === selected.value)
})
</script>

<template>
  <div class="dashboard">
    <Dividas :dividas="userStore.dividas" v-model:selected="selected"></Dividas>
    <Produtos v-if="!selectedDetalhe"></Produtos>
    <Detalhamento v-else :divida="selectedDetalhe"></Detalhamento>
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
