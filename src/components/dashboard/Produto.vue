<script setup lang="ts">
import { computed } from "vue";

interface IProduto {
  img: string;
  redirect: string;
}
const props = defineProps<{
  produto: IProduto;
}>();
const imageUrl = computed(
  () =>
    new URL(`/src/assets/produtos/${props.produto.img}.png`, import.meta.url)
      .href
);
</script>

<template>
  <a :href="props.produto.redirect" class="produto-card" target="_black">
    <img :src="imageUrl" class="image" />
  </a>
</template>

<style scoped lang="scss">
.produto-card {
  height: 100%;
  cursor: pointer;
  margin: 10px;
  margin-right: 20px;
  &,
  & .image {
    height: 300px;
  }
}
@media (max-width: 700px) {
  .produto-card,
  .image {
    height: 270px !important;
  }
}
@media (min-width: 1500px) {
  .produto-card,
  .image {
    height: 450px !important;
  }
}
</style>
