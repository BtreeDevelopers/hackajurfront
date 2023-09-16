import { computed, ref } from "vue";

export function usePhoneMask() {
  const phoneNumber = ref("");
  const phoneNumberWithoutMask = computed(() => {
    return phoneNumber.value.replace(/\D/g, "");
  });

  const updatePhoneNumber = (e: any) => {
    let x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2]
      ? x[1]
      : `(${x[1]}) ${x[2]}` + (x[3] ? `-${x[3]}` : "");
    phoneNumber.value = e.target.value;
  };
  const setPhone = (value: string) => {
    const newVal = value.replace(/[^0-9]/g, "");
    if (newVal) {
      phoneNumber.value = newVal.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      phoneNumber.value = "";
    }
  };
  const isPhoneNumberValid = computed(() => {
    // Você pode adicionar validações adicionais aqui, se necessário
    return isValidPhoneNumberWithDDD(phoneNumber.value); // Verifica se o número tem 11 dígitos
  });

  return {
    updatePhoneNumber,
    phoneNumber,
    phoneNumberWithoutMask,
    isPhoneNumberValid,
    setPhone,
  };
}
function isValidPhoneNumberWithDDD(phoneNumber: string) {
  // Expressão regular para validar números de telefone com DDD no formato brasileiro
  const phonePattern = /^(?:\(?[1-9][0-9]\)?\s?)?(?:9\d{4}|\d{4})[-\s]?\d{4}$/;

  return phonePattern.test(phoneNumber);
}
