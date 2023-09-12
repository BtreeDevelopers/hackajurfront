<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import Divida from "./Divida.vue";
interface IDividas {
  _id: string;
  produto: string;
  status: string;
  saldo: number;
  contrato: string;
}
const props = withDefaults(
  defineProps<{
    dividas?: IDividas[];
    selected?: string;
  }>(),
  {
    dividas: () => [],
  }
);
const emit = defineEmits<{
  "update:selected": [id: string];
}>();
const selecionado = ref("");
watch(
  () => selecionado.value,
  (value) => {
    emit("update:selected", value);
  }
);
onMounted(() => {
  console.log(props);
  if (props.selected) {
    selecionado.value = props.selected;
  }
});
</script>

<template>
  <div class="dividas">
    <div v-if="props.dividas.length === 0" class="banner">
      Parabéns, você está em dia!
    </div>
    <div v-else>
      <p class="title">Dívidas em aberto</p>
      <div class="list-dividas">
        <Divida
          v-for="divida in props.dividas"
          :key="divida._id"
          :divida="divida"
          :selected="selecionado === divida._id"
          @select="(id) => (selecionado = id)"
        ></Divida>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dividas {
  margin-bottom: 20px;
  .banner {
    border-radius: 10px;
    background: linear-gradient(90deg, #055550 0%, #1b7e6c 100%);
    padding: 40px 50px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
  }
  .title {
    color: #055550;
    font-size: 18px;
    font-weight: 700;
  }
  .list-dividas {
    display: flex;
    overflow-x: auto;
    margin-top: 20px;
  }
}
@media (max-width: 750px) {
  .dividas {
    .banner {
      padding: 20px 25px;
    }
  }
}
</style>
