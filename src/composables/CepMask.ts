import { computed, ref } from "vue";

export function useCepMask() {
  const cep = ref("");
  const cepWithoutMask = computed(() => cep.value.replace(/\D/g, ""));

  const updateCep = (e: any) => {
    let x = e.target.value.replace(/\D/g, "");
    x = x.match(/(\d{0,5})(\d{0,3})/);
    e.target.value = !x[2] ? x[1] : x[1] + "-" + x[2];

    cep.value = e.target.value;
  };
  const setCep = (value: string) => {
    const newVal = value.replace(/[^0-9]/g, "");
    if (newVal) {
      if (newVal.length === 8) {
        cep.value = newVal.replace(/(\d{5})(\d{3})/g, "$1-$2");
      } else {
        cep.value = newVal;
      }
    } else {
      cep.value = "";
    }
  };
  const isCepValid = computed(() => {
    return cepWithoutMask.value.length === 8;
  });

  return {
    updateCep,
    cep,
    cepWithoutMask,
    isCepValid,
    setCep,
  };
}
