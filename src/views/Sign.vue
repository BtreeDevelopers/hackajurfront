<script setup lang="ts">
import { useTaxIdMask } from "@/composables/TaxIdMask";
import CreateAccount from "@/components/modais/CreateAccount.vue";
import Button from "@/components/Button.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import TextFieldIcon from "@/components/TextFieldIcon.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
import { login } from "@/services/hacka"
import { IResponseLogin } from "@/models/user"
import { useUserStore } from "@/stores/user"
import { useToast } from "vue-toastification";

const userStore = useUserStore();

const { updateCpfCnpj: loginUpdateCpfCnpj, cpfCnpjWithoutMask: loginTaxId, isCpfCnpjValid: loginValid } = useTaxIdMask();
const { updateCpfCnpj: logonUpdateCpfCnpj, cpfCnpj, isCpfCnpjValid: logonValid, setCpfCnpj } = useTaxIdMask();
const modal = ref(false);
const screenToShow = ref("login");
function changeScreen() {
  screenToShow.value = screenToShow.value === "login" ? "create" : "login";
}
const router = useRouter();
const route = useRoute();
const show = ref(false);
const loading = ref(false);
const senha = ref("");
onMounted(() => {
  if (route.query.create) {
    setCpfCnpj(route.query.create as string);
    if (logonValid.value) {
      modal.value = true;
    }
  }
})
watch(() => modal.value, (value) => {
  if (!value) {
    router.replace({
      query: {}
    })
  }
})
const toast = useToast();
async function realizarLogin() {
  try {
    loading.value = true;
    const dataLogin = await login<IResponseLogin>({
      cpf: loginTaxId.value,
      senha: senha.value
    });
    userStore.setUser(dataLogin);
    router.push('/dashboard')
  } catch (e) {
    toast.error('Ocorreu um ao tentar fazer o login.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="screen">
    <CreateAccount v-model:status="modal" :cpf="cpfCnpj" @clearCPF="() => setCpfCnpj('')"></CreateAccount>
    <div class="basecards">
      <div class="card login mr-5" :class="{ screenToShow: screenToShow === 'login' }">
        <h3 class="title">Já possui cadastro?</h3>
        <p class="description">Para entrar, informe seus dados.</p>
        <input type="text" class="text-field" placeholder="*CPF/CNPJ" @input="loginUpdateCpfCnpj" />
        <p v-if="!loginValid && loginTaxId" style="color: red;font-size: 12px;">CPF/CNPJ inválido</p>
        <TextFieldIcon :type="show ? 'text' : 'password'" placeholder="*Senha" color="#1e333b" @click:icon="show = !show"
          v-model="senha" icon-functional>
          <EyeIcon color="#055550"></EyeIcon>
        </TextFieldIcon>
        <p class="destaque cursor-pointer mb-6">Esqueci a senha</p>
        <Button @click="realizarLogin" color="#02a64c" color-destaque="#01612c" class="buttons" :loading="loading"
          :disabled="!loginValid || !senha">
          Acessar conta
        </Button>
      </div>
      <div class="card create space" :class="{ screenToShow: screenToShow === 'create' }">
        <div>
          <h3 class="title">Não tem cadastro?</h3>
          <p class="description">Crie sua conta agora. É rapidinho!</p>
          <input type="text" class="text-field" placeholder="*CPF/CNPJ" @input="logonUpdateCpfCnpj" :value="cpfCnpj" />
          <p v-if="!logonValid && cpfCnpj" style="color: red;font-size: 12px;">CPF/CNPJ inválido</p>
          <p class="destaque">(?) Identificação</p>
        </div>
        <Button @click="modal = true" color="#02a64c" color-destaque="#01612c" class="buttons" :disabled="!logonValid">
          Criar conta
        </Button>
      </div>
    </div>
    <p class="button-swap" @click="changeScreen">
      {{ screenToShow === "login" ? "Criar Conta" : "Entrar" }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.screen {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .buttons {
    color: #fff;
    width: 100%;
  }

  .button-swap {
    display: none;
  }

  .basecards {
    display: flex;

    .space {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card {
      border-radius: 10px;
      box-shadow: -2px 5px 13px 0px rgba(0, 0, 0, 0.25);
      padding: 30px;
      width: 370px;

      .title {
        margin-top: 0;
        font-size: 18px;
        font-weight: 700;
      }

      .description {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;
      }

      .text-field {
        border-radius: 10px;
        border: 1px solid #1e333b;
        width: 312px;
        height: 40px;
        background: none;
        margin-bottom: 10px;

        &,
        &::placeholder {
          color: #1e333b;
          font-size: 12px;
          font-weight: 400;
        }

        padding-left: 18px;

        &:focus {
          outline: none !important;
          border: 2px solid #1e333b;
        }
      }

      .destaque {
        color: #055550;
        font-size: 14px;
        font-weight: 500;
        width: fit-content;
        margin-left: auto;
      }

      .action {
        border: none;
        border-radius: 10px;
        background: #02a64c;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        height: 40px;
        width: 312px;
        cursor: pointer;

        &:hover {
          background: #01612c;
        }

        &:active {
          background: #02a64c;
        }
      }
    }
  }
}

@media (max-width: 770px) {
  .screen {
    .button-swap {
      display: block;
      margin-top: 15px;
      color: #02a64c;
      font-weight: 700;
      cursor: pointer;
    }

    .card {
      display: none !important;
      height: 310px !important;
    }

    .screenToShow {
      display: flex !important;
      flex-direction: column;
    }

    .login {
      margin: 0;
    }
  }
}
</style>
