<script lang="ts" setup>
import "@/assets/modal.scss";
import CloseIcon from "../icons/CloseIcon.vue";
import TextField from "../TextField.vue";
import { ref, watch } from "vue";
import TextFieldIcon from "@/components/TextFieldIcon.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
const props = defineProps<{ status: boolean, cpf: string }>();
const emit = defineEmits<{ "update:status": [val: boolean] }>();
const visibilidade = ref(false);
const senha = ref("");
const show = ref(false);
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
async function fechar() {
  emit("update:status", false);
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
              :value="props.cpf"></TextField>
            <TextField class="ml-2" placeholder="*Data Nascimento" color="#fff" width="60%"></TextField>
          </div>
          <div class="campos-iniciais mb-2">
            <TextField placeholder="*Nome Completo" color="#fff" width="60%"></TextField>
            <TextField class="ml-2" placeholder="*Telefone celular" color="#fff" width="40%"></TextField>
          </div>
          <TextField class="mb-2" placeholder="*Email" width="100%" color="#fff"></TextField>
          <TextFieldIcon class="mb-2" :type="show ? 'text' : 'password'" placeholder="*Senha" width="100%" color="#fff"
            @click:icon="show = !show" v-model="senha" icon-functional>
            <EyeIcon></EyeIcon>
          </TextFieldIcon>
          <p class="mb-2">
            Li e concordo com os <span>Termos</span> e
            <span>Politica de Privacidade</span>.
          </p>
          <p class="mb-5">
            Eu concordo em receber oportunidades e lembretes por e-mail e SMS.
          </p>
          <button class="action">Criar conta</button>
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
