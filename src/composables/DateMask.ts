import { computed, ref } from "vue";

export function useDateMask() {
  const dateOfBirth = ref("");
  const dateOfBirthWithMask = computed(() => {
    const value = dateOfBirth.value.split("/");
    let finalVal = "";
    if (value[2]) {
      finalVal = value[2];
    }
    finalVal += "-";
    if (value[1]) {
      finalVal += value[1];
    }
    finalVal += "-";
    if (value[0]) {
      finalVal += value[0];
    }
    return finalVal;
  });

  const updateDateOfBirth = (e: any) => {
    let x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,2})(\d{0,4})/);

    e.target.value = !x[2]
      ? x[1]
      : x[1] + "/" + x[2] + (x[3] ? "/" + x[3] : "");
    dateOfBirth.value = e.target.value;
  };

  const isDateOfBirthValid = computed(() => {
    return isValidDate(dateOfBirth.value);
  });

  return {
    updateDateOfBirth,
    dateOfBirth,
    dateOfBirthWithMask,
    isDateOfBirthValid,
  };
}
function isValidDate(dateString: string) {
  // Verifica se a data está no formato DD/MM/YYYY
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!datePattern.test(dateString)) {
    return false;
  }

  // Divide a data em dia, mês e ano
  const [, day, month, year] = dateString.match(datePattern)!.map(Number);

  // Verifica se o ano é válido (entre 1900 e 2099, por exemplo)
  if (year < 1900 || year > 2099) {
    return false;
  }

  // Verifica se o mês está entre 1 e 12
  if (month < 1 || month > 12) {
    return false;
  }

  // Verifica se o dia é válido para o mês e ano especificados
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return false;
  }

  return true;
}
