<script setup lang="ts">
import Identidade from "@/components/modais/Identidade.vue";
import { computed, ref } from "vue";

const doc =
  "https://firebasestorage.googleapis.com/v0/b/hackajuralgar.appspot.com/o/proposta1_ThalysRicardo_2023-09-1616%3A18%3A55.784063.pdf?alt=media&token=2b4f45d6-0b06-4030-9a3a-a549f412cda3";
const isMobileDevice = computed(() => {
  return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
});
const modal = ref(true);
</script>

<template>
  <div class="reader">
    <template v-if="isMobileDevice">
      <Identidade v-model:status="modal"></Identidade>
      <iframe :src="doc" frameborder="0" width="100%" height="100%"></iframe>
    </template>
    <div
      v-else
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        color: #055550;
        font-size: 24px;
        font-weight: 700;
      "
      class="h-full"
    >
      Usar no telefone
    </div>
  </div>
</template>

<style scoped></style>
