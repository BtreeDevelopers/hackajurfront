<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
const props = withDefaults(
    defineProps<{
        color?: string;
        backgroundColor?: string;
        modelValue?: any;
        size?: string;
    }>(),
    {
        color: "#fff",
        backgroundColor: "#1B7E6C",
        size: '20px'
    }
);
const emit = defineEmits<{
    'update:modelValue': [value: any]
}>();
const internalValue = ref(false)
onMounted(() => {
    internalValue.value = props.modelValue;
})
watch(() => internalValue.value, () => {
    emit('update:modelValue', internalValue.value)
}, {
    immediate: true
})
</script>

<template>
    <label class="form-control">
        <input type="checkbox" name="checkbox" v-model="internalValue" />
        <slot></slot>
    </label>
</template>
<style lang="scss">
.form-control {
    font-size: v-bind(size);
    display: grid;
    grid-template-columns: 1em auto;
    gap: 0.5em;
}

input[type="checkbox"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: v-bind(backgroundColor);
    /* Not removed via appearance */
    margin: 0;
    cursor: pointer;

    font: inherit;
    color: v-bind(backgroundColor);
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid v-bind(backgroundColor);
    border-radius: 0.15em;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;
}

input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em v-bind(color);
    /* Windows High Contrast Mode */
    background-color: CanvasText;
}

input[type="checkbox"]:checked::before {
    transform: scale(1);
}
</style>