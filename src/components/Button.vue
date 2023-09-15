<script setup lang="ts">
import Loading from './Loading.vue';


withDefaults(
  defineProps<{
    color?: string;
    colorDestaque?: string;
    colorLoading?: string;
    width?: string;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    color: "#fc0",
    colorDestaque: "#d8ad00",
    colorLoading: "#fff",
    width: "150px",
  }
);
const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button @click="loading || disabled ? null : emit('click')" class="button" :class="{ loading: loading || disabled }"
    :disabled="loading || disabled">
    <div v-if="loading" class="base-load">

      <loading :color="colorLoading" :size="0.5"></loading>
    </div>
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

  .base-load {
    overflow: hidden;
    margin-top: -5px;
    height: 96%;
    display: flex;
    justify-content: center;
  }

  &:hover:not(.loading) {
    background: v-bind(colorDestaque);
  }

  &:active {
    background: v-bind(color);
  }
}
</style>
