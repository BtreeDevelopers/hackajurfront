import { computed, ref } from "vue";

export function useCepMask() {
  const cep = ref("");
  const cepWithoutMask = ref("");

  const updateCep = (e: any) => {
    let x = e.target.value.replace(/\D/g, "");
    x = x.match(/(\d{0,5})(\d{0,3})/);
    e.target.value = !x[2] ? x[1] : x[1] + "-" + x[2];

    cep.value = e.target.value;
    cepWithoutMask.value = x[1] + x[2];
  };
  const isCepValid = computed(() => {
    return cepWithoutMask.value.length === 8;
  });

  return {
    updateCep,
    cep,
    cepWithoutMask,
    isCepValid,
  };
}
