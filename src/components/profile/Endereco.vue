<script setup lang="ts">
import TextField from "../TextField.vue";
import Select from "../Select.vue";
import Button from "../Button.vue";
import { getLocal } from "@/services/cep";
import { ref, onMounted, watch } from "vue";
import { useCepMask } from "@/composables/CepMask";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const { updateCep, cepWithoutMask, isCepValid, setCep } = useCepMask();
onMounted(() => {
  setCep(userStore.cep);
})
watch(() => cepWithoutMask.value, (value) => {
  if (value !== userStore.cep) {
    userStore.cep = value;
  }
})
const tipo = [
  {
    text: "Casa",
    value: "casa",
  },
  {
    text: "Apartamento",
    value: "apartamento",
  },
  {
    text: "Box",
    value: "box",
  },
  {
    text: "Caixa Postal",
    value: "caixapostal",
  },
  {
    text: "Chacara",
    value: "chacara",
  },
  {
    text: "Condominio",
    value: "condominio",
  },
  {
    text: "Conjunto",
    value: "conjunto",
  },
  {
    text: "Edificio",
    value: "edificio",
  },
  {
    text: "Fazenda",
    value: "fazenda",
  },
  {
    text: "Undos",
    value: "undos",
  },
  {
    text: "Galeria",
    value: "galeria",
  },
  {
    text: "KM",
    value: "km",
  },
  {
    text: "Quadra",
    value: "quadra",
  },
  {
    text: "Sala",
    value: "sala",
  },
  {
    text: "Setor",
    value: "setor",
  },
  {
    text: "Shopping",
    value: "shopping",
  },
  {
    text: "Sitio",
    value: "sitio",
  },
];

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
  } finally {
    loadingCep.value = false;
  }
}
</script>

<template>
  <div class="pessoal">
    <p class="title">Dados de endereço</p>
    <div class="base">
      <div class="divider-cep">
        <TextField placeholder="CEP" color="#1B7E6C" width="100%" @input="updateCep"></TextField>
        <p v-if="loadingCep" style="color: red">loading</p>
        <Button v-else @click="obterLocalizacao">Buscar</Button>
      </div>
      <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank">
        <p class="destaque">Não sabe seu CEP?</p>
      </a>
      <div class="divider">
        <TextField class="input-divider-1" :readonly="true" placeholder="UF" color="#1B7E6C" v-model="userStore.uf">
        </TextField>
        <TextField class="input-divider-2" :readonly="true" placeholder="Cidade" color="#1B7E6C"
          v-model="userStore.cidade">
        </TextField>
      </div>
      <TextField :readonly="true" placeholder="Bairro" color="#1B7E6C" width="100%" v-model="userStore.bairro">
      </TextField>
      <TextField :readonly="true" placeholder="Rua" color="#1B7E6C" width="100%" v-model="userStore.rua"></TextField>
      <TextField placeholder="Número" color="#1B7E6C" width="100%" v-model="userStore.numero"></TextField>
      <Select placeholder="Tipo" color="#1B7E6C" :items="tipo" width="100%" v-model="userStore.tipo"></Select>
      <TextField placeholder="Complemento" color="#1B7E6C" width="100%" v-model="userStore.complemento"></TextField>
      <div class="action">
        <Button>Salvar</Button>
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

      >input {
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
