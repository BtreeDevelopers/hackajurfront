<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import ArrowDownGreenIcon from "./icons/ArrowDownGreenIcon.vue";
import useDetectOutsideClick from "@/composables/detectOutsideClick";
interface IItems {
  text: string;
  value: string;
}

const props = withDefaults(
  defineProps<{
    items?: IItems[];
    color?: string;
    readonly?: boolean;
    placeholder?: string;
    modelValue?: string;
  }>(),
  {
    items: () => [],
    color: "#1e333b",
  }
);
const selected = ref<string>(props.modelValue ? props.modelValue : "");
const open = ref(false);
const selectRef = ref(null);
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
onMounted(() => {
  emit("update:modelValue", selected.value);
});
useDetectOutsideClick(selectRef, () => {
  open.value = false;
});
const showValue = computed(() => {
  if (selected.value) {
    const valor = props.items.find((el) => el.value === selected.value);
    if (valor) {
      return valor.text;
    }
    return selected.value;
  }
  if (props.placeholder) return props.placeholder;
  return "";
});
</script>
<template>
  <div class="hackajur-select" ref="selectRef" @blur="open = false">
    <div
      class="selected"
      :class="{ open: open, readonly: readonly }"
      @click="readonly ? null : (open = !open)"
    >
      <p>
        {{ showValue }}
      </p>
      <ArrowDownGreenIcon class="icon-select"></ArrowDownGreenIcon>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of items"
        :key="i"
        @click="
          selected = option.value;
          open = false;
          emit('update:modelValue', option.value);
        "
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.hackajur-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 40px;
  /* line-height: 40px; */
  margin-bottom: 10px;
}

.hackajur-select .selected {
  height: 100%;
  border-radius: 10px;
  border: 1px solid v-bind(color);
  color: v-bind(color);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 16px;
  font-size: 12px;
}
.hackajur-select .selected.readonly {
  background: #f3f3f3;
  cursor: default;
}

.hackajur-select .selected.open {
  border: 2px solid v-bind(color);
  border-radius: 10px 10px 0px 0px;
}

.hackajur-select .items {
  color: v-bind(color);
  border-radius: 0px 0px 10px 10px;
  overflow: hidden;
  border-right: 2px solid v-bind(color);
  border-left: 2px solid v-bind(color);
  border-bottom: 2px solid v-bind(color);
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  z-index: 1;
}

.hackajur-select .items div {
  color: v-bind(color);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.hackajur-select .items div:hover {
  background-color: v-bind(color);
  color: #fff;
}

.selectHide {
  display: none;
}
</style>
