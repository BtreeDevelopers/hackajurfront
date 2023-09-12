<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder: string;
    type?: string;
    modelValue?: any;
    color?: string;
    width?: string;
    readonly?: boolean;
  }>(),
  {
    type: "text",
    color: "#1e333b",
    width: "312px",
    readonly: false,
  }
);
const emit = defineEmits<{
  "update:modelValue": [val: any];
  "click:icon": [];
}>();
</script>

<template>
  <input
    :type="props.type"
    class="text-field"
    :placeholder="props.placeholder"
    @input="(e) => emit('update:modelValue', (e.target as any).value)"
    :value="modelValue"
    :readonly="readonly"
  />
</template>

<style scoped lang="scss">
.text-field {
  border-radius: 10px;
  border: 1px solid v-bind(color);
  width: v-bind(width);
  height: 40px;
  background: none;
  margin-bottom: 10px;
  &[readonly=""] {
    background: #f3f3f3;
    &:focus {
      border: 1px solid v-bind(color);
    }
  }
  &,
  &::placeholder {
    color: v-bind(color);
    font-size: 12px;
    font-weight: 400;
  }
  padding-left: 18px;
  &:focus {
    outline: none !important;
    border: 2px solid v-bind(color);
  }
}
</style>
