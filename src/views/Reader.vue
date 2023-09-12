<script setup lang="ts">
import { ref } from 'vue';
import type VueSignaturePad from 'vue-signature-pad';

const signaturePad = ref<VueSignaturePad | null>(null);
function undo() {
  signaturePad.value!.undoSignature();
}
function save() {
  const { isEmpty, data } = signaturePad.value!.saveSignature();
  console.log(isEmpty);
  console.log(data);
}

</script>

<template>
  <div class="reader">
    <VueSignaturePad ref="signaturePad" width="300px" height="200px" />
    <div>
      <button @click="save">Save</button>
      <button @click="undo">Undo</button>
    </div>
  </div>
</template>

<style scoped>
canvas {
  border: 1px solid #000;
  cursor: pointer;
}
</style>