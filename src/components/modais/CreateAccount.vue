<script lang="ts" setup>
import "@/assets/modal.scss";
import CloseIcon from "../icons/CloseIcon.vue";
import TextField from "../TextField.vue";
import Checkbox from "../Checkbox.vue";
import Button from "../Button.vue";
import { ref, watch, computed } from "vue";
import TextFieldIcon from "@/components/TextFieldIcon.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
import { useDateMask } from "@/composables/DateMask";
import { usePhoneMask } from "@/composables/PhoneMask";
import { createaccount } from "@/services/hacka"
import { useToast } from 'vue-toastification';
const props = defineProps<{ status: boolean, cpf: string }>();
const emit = defineEmits<{ "update:status": [val: boolean], clearCPF: [] }>();

const { updateDateOfBirth, dateOfBirth, isDateOfBirthValid, dateOfBirthWithMask } = useDateMask();
const { updatePhoneNumber, phoneNumber, isPhoneNumberValid, phoneNumberWithoutMask } = usePhoneMask();
const visibilidade = ref(false);
const senha = ref("");
const email = ref("");
const nome = ref("");
const show = ref(false);
const termos = ref(false);
const receberAtt = ref(false);
const loading = ref(false);
watch(
  () => props.status,
  (val) => {
    visibilidade.value = props.status;
    val
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "inherit");
  },
  { immediate: true }
);

function isValidEmail(email: string) {
  // Expressão regular para validar endereços de e-mail
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailPattern.test(email);
}
const isValidData = computed(() => {
  return isDateOfBirthValid.value && nome.value && isPhoneNumberValid.value && email.value && isValidEmail(email.value) && senha.value && termos.value
})
function fechar() {
  emit("update:status", false);
}
const toast = useToast();
async function criarConta() {
  try {
    loading.value = true;
    const dataCreate = {
      "nome": nome.value,
      "email": email.value,
      "senha": senha.value,
      "cpf_cnpj": props.cpf.replace(/\D/g, ""),
      "celular": phoneNumberWithoutMask.value,
      "receberatt": receberAtt.value,
      "dataNascimento": dateOfBirthWithMask.value
    };
    await createaccount(dataCreate);
    emit("clearCPF");

    toast.success('Conta criada com sucesso!')
    fechar();
  } catch (e) {
    toast.error('Ocorreu um ao criar a conta.')
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div :class="visibilidade ? 'janela aberta' : 'janela fechada'">
    <div class="moldura">
      <div class="create-account">
        <div class="header mb-5">
          <h3>Criar conta</h3>
          <div class="closebutton" @click="fechar">
            <CloseIcon />
          </div>
        </div>
        <div class="base">
          <p class="mb-2">Crie sua conta agora. É rapidinho!</p>
          <div class="campos-iniciais">
            <TextField class="cpf-text-field" placeholder="*CPF/CNPJ" color="#fff" width="40%" :readonly="true"
              :model-value="props.cpf"></TextField>
            <div style="width: 60%" class="ml-2 mb-2">
              <TextField placeholder="*Data Nascimento" color="#fff" @input="updateDateOfBirth" width="100%"
                style="margin-bottom: 2px;">
              </TextField>
              <p v-if="!isDateOfBirthValid && dateOfBirth" style="color: #ff9800;font-size: 12px;">Data de nascimento
                inválida
              </p>
            </div>
          </div>
          <div class="campos-iniciais mb-2">
            <TextField placeholder="*Nome Completo" v-model="nome" color="#fff" width="60%"></TextField>
            <div tyle="width: 40%" class="ml-2 mb-2">
              <TextField placeholder="*Telefone celular" color="#fff" width="100%" @input="updatePhoneNumber"
                style="margin-bottom: 2px;"></TextField>
              <p v-if="!isPhoneNumberValid && phoneNumber" style="color: #ff9800;font-size: 12px;">Telefone
                inválido
              </p>
            </div>
          </div>
          <div class="mb-2">

            <TextField placeholder="*Email" v-model="email" width="100%" color="#fff" style="margin-bottom: 2px;">
            </TextField>
            <p v-if="!isValidEmail(email) && email" style="color: #ff9800;font-size: 12px;">Email
              inválido
            </p>
          </div>
          <TextFieldIcon class="mb-2" :type="show ? 'text' : 'password'" placeholder="*Senha" width="100%" color="#fff"
            @click:icon="show = !show" v-model="senha" icon-functional>
            <EyeIcon></EyeIcon>
          </TextFieldIcon>
          <div class="options">
            <Checkbox background-color="#fff" color="#1B7E6C" size="15px" class="mt-1" v-model="termos"></Checkbox>
            <p class="mb-2">
              Li e concordo com os <span>Termos</span> e
              <span>Politica de Privacidade</span>.
            </p>
          </div>
          <div class="options mb-5">
            <Checkbox background-color="#fff" color="#1B7E6C" size="15px" class="mt-1" v-model="receberAtt"></Checkbox>
            <p>
              Eu concordo em receber oportunidades e lembretes por e-mail e SMS.
            </p>
          </div>
          <Button width="100%" :disabled="!isValidData" :loading="loading" @click="criarConta">Criar conta</Button>
        </div>
        <div class="aux"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.moldura {
  height: auto;
  background: #1b7e6c;
  color: #fff;
  padding: 30px;

  .create-account {
    .options {
      display: flex;
    }

    .cpf-text-field {
      background-color: transparent !important;
    }

    .header {
      display: flex;
      justify-content: space-between;

      h3 {
        margin: 0;
      }

      .closebutton {
        cursor: pointer;
      }
    }

    .base {
      margin-left: auto;
      margin-right: auto;
      width: 65%;
      display: flex;
      flex-direction: column;

      .campos-iniciais {
        display: flex;
      }

      .action {
        border: none;
        border-radius: 10px;
        background: #fc0;
        color: #1b7e6c;
        font-size: 12px;
        font-weight: 700;
        height: 40px;
        cursor: pointer;

        &:hover {
          background: #d8ad00;
        }

        &:active {
          background: #fc0;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  .create-account .base {
    width: 80% !important;
  }
}

@media (max-width: 600px) {
  .moldura {
    padding: 30px 15px;
    height: 100%;
  }

  .create-account {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .aux {
      height: 30px;
    }
  }

  .create-account .base {
    width: 100% !important;
  }
}
</style>
