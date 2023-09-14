<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string;
    colorDestaque?: string;
    width?: string;
    loading?: boolean
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
  <button @click="loading ? null : emit('click')" class="button loading" :disabled="loading">
    <div v-if="loading">loading</div>
    <slot v-else></slot>
  </button>
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

  &:not(.loading):hover {
    background: v-bind(colorDestaque);
  }

  &:active {
    background: v-bind(color);
  }
}
</style>
