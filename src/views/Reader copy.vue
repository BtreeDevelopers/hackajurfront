<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);
const isDrawing = ref(false);

// Configura o contexto do canvas ao montar o componente
onMounted(() => {
  if (canvas.value) {
    context.value = canvas.value.getContext('2d');
  }
});

// Limpa o contexto do canvas antes de desmontar o componente
onBeforeUnmount(() => {
  if (canvas.value) {
    context.value = null;
    canvas.value.removeEventListener('mousedown', startDrawing);
    canvas.value.removeEventListener('mousemove', draw);
    canvas.value.removeEventListener('mouseup', stopDrawing);
    canvas.value.removeEventListener('touchstart', startDrawing);
    canvas.value.removeEventListener('touchmove', draw);
    canvas.value.removeEventListener('touchend', stopDrawing);
  }
});

function startDrawing(event: MouseEvent | TouchEvent) {
  event.preventDefault(); // Evita comportamento padrão dos toques (scroll, zoom, etc.)

  if (context.value) {
    const x = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const y = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    context.value.beginPath();
    context.value.moveTo(x - canvas.value!.getBoundingClientRect().left, y - canvas.value!.getBoundingClientRect().top);
    isDrawing.value = true;
  }
}

function draw(event: MouseEvent | TouchEvent) {
  event.preventDefault();

  if (isDrawing.value && context.value) {
    const x = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const y = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    context.value.lineTo(x - canvas.value!.getBoundingClientRect().left, y - canvas.value!.getBoundingClientRect().top);
    context.value.stroke();
  }
}

function stopDrawing() {
  isDrawing.value = false;
}

function clearCanvas() {
  if (context.value && canvas.value) {
    context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
}

function saveSignature() {
  if (canvas.value) {
    const signatureDataUrl = canvas.value.toDataURL();
    // Aqui você pode enviar a assinatura (signatureDataUrl) para o servidor ou realizar outra ação.
    console.log('Assinatura salva:', signatureDataUrl);
  }
}
</script>

<template>
  <div>
    <canvas ref="canvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing" @touchstart="startDrawing"
      @touchmove="draw" @touchend="stopDrawing"></canvas>
    <button @click="clearCanvas">Limpar</button>
    <button @click="saveSignature">Salvar Assinatura</button>
  </div>
</template>

<style scoped>
canvas {
  border: 1px solid #000;
  cursor: pointer;
}
</style>