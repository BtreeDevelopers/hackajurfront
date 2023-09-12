<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string;
    colorDestaque?: string;
    width?: string;
  }>(),
  {
    color: "#fc0",
    colorDestaque: "#d8ad00",
    width: "150px",
  }
);
const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button @click="emit('click')" class="button"><slot></slot></button>
</template>

<style scoped lang="scss">
.button {
  border: none;
  border-radius: 10px;
  background: v-bind(color);
  color: #1b7e6c;
  font-size: 12px;
  font-weight: 700;
  width: v-bind(width);
  height: 40px;
  cursor: pointer;
  &:hover {
    background: v-bind(colorDestaque);
  }
  &:active {
    background: v-bind(color);
  }
}
</style>
