<script setup lang="ts">
import Dividas from "@/components/dashboard/Dividas.vue";
import Produtos from "@/components/dashboard/Produtos.vue";
import Detalhamento from "@/components/dashboard/Detalhamento.vue";
import Loading from "@/components/Loading.vue";
import IDividas from "@/models/dividas"
import { useUserStore } from "@/stores/user";
import { getDividas } from "@/services/hacka";
import { computed, ref, onMounted } from "vue";
const userStore = useUserStore();
const loading = ref(false);
onMounted(() => {
  updateDividas()
})

async function updateDividas() {
  try {
    loading.value = true;
    const dataDividas = await getDividas<{ dividas: IDividas[] }>();
    userStore.dividas = dataDividas.dividas;
  } finally {
    loading.value = false;
  }
}
const selected = ref("");
const selectedDetalhe = computed(() => {
  return userStore.dividas.find((divida) => divida._id === selected.value)
})
</script>

<template>
  <div class="dashboard center" v-if="loading">
    <Loading :size="2"></Loading>
  </div>
  <div class="dashboard" v-else>
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

.center {
  align-items: center;
  justify-content: center;
}
</style>
