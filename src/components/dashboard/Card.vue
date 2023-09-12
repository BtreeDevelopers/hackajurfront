<script setup lang="ts">
import ArrowDownGreenIcon from "@/components/icons/ArrowDownGreenIcon.vue";
defineProps<{
  title: string;
  expandir?: boolean;
}>();
const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <div class="card" @click="emit('click')">
    <div class="base">
      <p class="title">{{ title }}</p>
      <ArrowDownGreenIcon
        :class="{ 'arrow-rotate': expandir }"
      ></ArrowDownGreenIcon>
    </div>
    <div class="body" v-if="expandir" @click.prevent.stop>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  border-radius: 10px;
  background: #f0f0f0;
  padding: 40px 30px;
  cursor: pointer;
  .arrow-rotate {
    transform: rotate(180deg);
  }
  .body {
    margin-top: 10px;
  }
  .base {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    color: #1b7e6c;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
