<script setup lang="ts">
import { ref } from "vue";
import ArrowDownGreenIcon from "./icons/ArrowDownGreenIcon.vue";

interface IItems {
  text: string;
  value: string;
}
const props = withDefaults(
  defineProps<{
    placeholder: string;
    modelValue?: any;
    color?: string;
    width?: string;
    readonly?: boolean;
    items: IItems[];
  }>(),
  {
    color: "#1e333b",
    width: "312px",
    readonly: false,
  }
);
const emit = defineEmits<{
  "update:modelValue": [val: any];
}>();
const internalValue = ref(props.modelValue);
</script>

<template>
  <div class="base-select">
    <p class="placeholder" v-if="!internalValue">{{ props.placeholder }}</p>
    <select
      class="select"
      @input="(e) => emit('update:modelValue', e)"
      :value="internalValue"
      :readonly="readonly"
    >
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.text }}
      </option>
    </select>
    <ArrowDownGreenIcon class="icon-select"></ArrowDownGreenIcon>
  </div>
</template>

<style scoped lang="scss">
.base-select {
  position: relative;
}
.placeholder {
  color: v-bind(color);
  font-size: 12px;
  font-weight: 400;
  pointer-events: none;
  position: absolute;
  margin-top: 13px;
  margin-left: 17px;
}
.icon-select {
  margin-top: 14px;
  pointer-events: none;
  position: absolute;
  margin-left: -32px;
}
.select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 10px;
  border: 1px solid v-bind(color);
  width: v-bind(width);
  height: 40px;
  background: none;
  margin-bottom: 10px;
  cursor: pointer;
  &[readonly=""] {
    background: #f3f3f3;
    pointer-events: none;
    &:focus {
      border: 1px solid v-bind(color);
    }
  }
  & {
    color: v-bind(color);
    font-size: 12px;
    font-weight: 400;
  }
  padding-left: 18px;
  padding-right: 18px;
  &:focus {
    outline: none !important;
    border: 2px solid v-bind(color);
  }
}
</style>
