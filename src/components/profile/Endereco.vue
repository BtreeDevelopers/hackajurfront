<script setup lang="ts">
import TextField from "../TextField.vue";
import Button from "../Button.vue";
import { getLocal } from "@/services/cep";
import { ref, onMounted, watch } from "vue";
import { useCepMask } from "@/composables/CepMask";
import { useUserStore } from "@/stores/user";
import { updateUser } from "@/services/hacka";
import { useToast } from "vue-toastification";
const userStore = useUserStore();
const toast = useToast();

const { updateCep, cepWithoutMask, isCepValid, setCep, cep } = useCepMask();
onMounted(() => {
  setCep(userStore.cep);
});
watch(
  () => cepWithoutMask.value,
  (value) => {
    if (value !== userStore.cep) {
      userStore.cep = value;
    }
  }
);

const loadingCep = ref(false);
async function obterLocalizacao() {
  try {
    if (!isCepValid.value) return;
    loadingCep.value = true;
    const { data } = await getLocal(cepWithoutMask.value);
    userStore.uf = data.state;
    userStore.cidade = data.city;
    userStore.bairro = data.neighborhood;
    userStore.rua = data.street;
  } catch (error) {
    toast.error("Erro ao obter localização");
  } finally {
    loadingCep.value = false;
  }
}
const loading = ref(false);
async function enviarDados() {
  try {
    loading.value = true;
    const data = new FormData();
    data.append("userId", userStore._id);
    data.append("cep", userStore.cep);
    data.append("uf", userStore.uf);
    data.append("cidade", userStore.cidade);
    data.append("bairro", userStore.bairro);
    data.append("rua", userStore.rua);
    data.append("numero", userStore.numero);
    data.append("complemento", userStore.complemento);

    await updateUser(data);
    toast.success("Dados de endereço atualizados com sucesso.");
  } catch (e) {
    toast.error("Erro ao atualizar dados de endereço");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="pessoal">
    <p class="title">Dados de endereço</p>
    <div class="base">
      <div class="divider-cep">
        <TextField
          placeholder="CEP"
          color="#1B7E6C"
          width="100%"
          @input="updateCep"
          :model-value="cep"
        ></TextField>
        <Button @click="obterLocalizacao" :loading="loadingCep">Buscar</Button>
      </div>
      <a
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
      >
        <p class="destaque">Não sabe seu CEP?</p>
      </a>
      <div class="divider">
        <TextField
          class="input-divider-1"
          :readonly="true"
          placeholder="UF"
          color="#1B7E6C"
          v-model="userStore.uf"
        >
        </TextField>
        <TextField
          class="input-divider-2"
          :readonly="true"
          placeholder="Cidade"
          color="#1B7E6C"
          v-model="userStore.cidade"
        >
        </TextField>
      </div>
      <TextField
        :readonly="true"
        placeholder="Bairro"
        color="#1B7E6C"
        width="100%"
        v-model="userStore.bairro"
      >
      </TextField>
      <TextField
        :readonly="true"
        placeholder="Rua"
        color="#1B7E6C"
        width="100%"
        v-model="userStore.rua"
      ></TextField>
      <TextField
        placeholder="Número"
        color="#1B7E6C"
        width="100%"
        v-model="userStore.numero"
      ></TextField>
      <TextField
        placeholder="Complemento"
        color="#1B7E6C"
        width="100%"
        v-model="userStore.complemento"
      ></TextField>
      <div class="action">
        <Button @click="enviarDados" :loading="loading">Salvar</Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pessoal {
  .title {
    color: #055550;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  .base {
    display: flex;
    flex-direction: column;

    .divider-cep {
      display: flex;

      > input {
        margin-right: 10px;
      }
    }

    .destaque {
      color: #055550;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .action {
      text-align: end;
    }

    .divider {
      display: flex;

      & .input-divider-1 {
        width: 40%;
      }

      & .input-divider-2 {
        width: 60%;
        margin-left: 10px;
      }
    }
  }
}
</style>
