<script setup lang="ts">
import { ref } from "vue";
import type VueSignaturePad from "vue-signature-pad";

defineProps<{
  width: string;
  height: string;
}>();
const emit = defineEmits<{
  signature: [value: string];
}>();
const signaturePad = ref<VueSignaturePad>();

//'data:image/png;base64,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'

// function undo() {
//     signaturePad.value!.undoSignature();
// }
function onEnd() {
  emit("signature", save());
}
function clear() {
  signaturePad.value!.clearSignature();
}
function save() {
  const { data } = signaturePad.value!.saveSignature();
  return data || "";
}
defineExpose({
  clear,
  save,
});
</script>

<template>
  <div class="reader">
    <VueSignaturePad
      ref="signaturePad"
      :width="width"
      :height="height"
      :options="{ onEnd }"
    />
  </div>
</template>

<style scoped>
canvas {
  border: 1px solid #000;
  cursor: pointer;
}
</style>
