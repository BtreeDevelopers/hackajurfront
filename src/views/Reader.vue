<script setup lang="ts">
import { ref } from 'vue';
import Signature from '@/components/Signature.vue';

const signaturePad = ref<InstanceType<typeof Signature> | null>(null);
function clear() {
  signaturePad.value!.clear();
}
function save() {
  signaturePad.value!.save()
}

</script>

<template>
  <div class="reader">
    <Signature ref="signaturePad" width="300px" height="200px" />
    <div>
      <button @click="save">Save</button>
      <button @click="clear">Undo</button>
    </div>
  </div>
</template>

<style scoped>
canvas {
  border: 1px solid #000;
  cursor: pointer;
}
</style>