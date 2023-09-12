import { computed, ref } from "vue";

export function useTaxIdMask() {
  const cpfCnpj = ref("");
  const cpfCnpjWithoutMask = computed(() =>
    cpfCnpj.value ? cpfCnpj.value.replace(/\D/g, "") : ""
  );

  const updateCpfCnpj = (e: any) => {
    let x = e.target.value.replace(/[^0-9]/g, "");
    x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    e.target.value = !x[2]
      ? x[1]
      : x[1] +
        "." +
        x[2] +
        (x[3] ? "." : "") +
        x[3] +
        (x[4] ? "/" : x[4]) +
        x[4] +
        (x[5] ? "-" + x[5] : "");

    if (e.target.value.length < 15) {
      x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
      e.target.value = !x[2]
        ? x[1]
        : x[1] +
          "." +
          x[2] +
          (x[3] ? "." : "") +
          x[3] +
          (x[4] ? "-" + x[4] : "");
    }
    cpfCnpj.value = e.target.value;
  };
  const isCpfCnpjValid = computed(() => {
    const valueWithoutMask = cpfCnpjWithoutMask.value;
    if (valueWithoutMask.length === 11) {
      return validCpf(valueWithoutMask);
    }
    if (valueWithoutMask.length === 14) {
      return validCnpj(valueWithoutMask);
    }
    return false;
  });

  return {
    updateCpfCnpj,
    cpfCnpj,
    cpfCnpjWithoutMask,
    isCpfCnpjValid,
  };
}

export function validCpf(taxId: string) {
  const cpf = taxId.replace(/\D/g, "");
  if (
    !cpf ||
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return false;
  }
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }
  return true;
}

export function validCnpj(cnpj: string) {
  cnpj = cnpj.replace(/[^\d]+/g, ""); // Remove todos os caracteres não numéricos
  if (cnpj.length !== 14) {
    return false; // Verifica se o CNPJ possui 14 dígitos
  }

  // Calcula os dígitos verificadores
  const digits = Array.from(cnpj).map(Number);
  let sum = 0;
  let position = 5;
  for (let digit of digits.slice(0, 12)) {
    sum += digit * position;
    position -= 1;
    if (position === 1) {
      position = 9;
    }
  }

  let remainder = sum % 11;
  if (remainder < 2) {
    if (digits[12] !== 0) {
      return false;
    }
  } else {
    if (digits[12] !== 11 - remainder) {
      return false;
    }
  }

  sum = 0;
  position = 6;
  for (let digit of digits.slice(0, 13)) {
    sum += digit * position;
    position -= 1;
    if (position === 1) {
      position = 9;
    }
  }

  remainder = sum % 11;
  if (remainder < 2) {
    if (digits[13] !== 0) {
      return false;
    }
  } else {
    if (digits[13] !== 11 - remainder) {
      return false;
    }
  }

  return true; // CNPJ válido
}
