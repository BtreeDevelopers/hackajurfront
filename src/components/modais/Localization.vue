<script lang="ts" setup>
import "@/assets/modal.scss";
import CloseBlackIcon from "../icons/CloseBlackIcon.vue";
import { getLocal } from "@/services/geo";
import { cities } from "@/services/hacka";
import LocalIcon from "../icons/LocalIcon.vue";
import TextFieldIcon from "../TextFieldIcon.vue";
import Loading from "../Loading.vue";
import state from "@/utils/state";
import { reactive, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import SearchIcon from "../icons/SearchIcon.vue";

const userStore = useUserStore();
const props = defineProps<{ status: boolean }>();
const emit = defineEmits<{ "update:status": [val: boolean] }>();
const visibilidade = ref(false);
const loading = ref(false);
const timer = ref(0);
const city = ref('');

watch(() => city.value, (value) => {
  if (value) {
    clearTimeout(timer.value);
    timer.value = setTimeout(async () => {
      await getCities();
    }, 1000) as any;
  } else {
    locais.splice(0);
    locais.push(...locaisIniciais)
  }
})

async function getCities() {
  try {
    loading.value = true;
    const slugName = normalizeText(city.value);
    const dataCities = await cities<{ cities: { nome: string, uf: { sigla: string } }[] }>(slugName);
    locais.splice(0);
    locais.push(...dataCities.cities.map((cit) => ({ city: cit.nome, uf: cit.uf.sigla })))
  } finally {
    loading.value = false;

  }
}
function removeAccent(word: string) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace("'", "");
}
function normalizeText(text: string) {
  return removeAccent(text.toLowerCase()).replace(/(\r\n|\n|\r|\s)/gm, "");
}
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

const locaisIniciais = [
  { city: "Uberlândia", uf: "MG" },
  { city: "São Paulo", uf: "SP" },
  { city: "Franca", uf: "SP" },
  { city: "Belo Horizonte", uf: "MG" },
  { city: "Uberaba", uf: "MG" },
  { city: "Fortaleza", uf: "CE" },
  { city: "Patos de Minas", uf: "MG" },
  { city: "Recife", uf: "PE" },
  { city: "Ituiutaba", uf: "MG" },
  { city: "Goiânia", uf: "GO" }

];

const locais = reactive([...locaisIniciais]);

async function getLocation() {
  loading.value = true;
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        // locais.splice(0);
        const { data } = await getLocal(
          position.coords.latitude,
          position.coords.longitude
        );

        selectLocal(data.address.city, state[data.address.state]);
        // locais.push({
        //   city: data.address.city_district,
        //   uf: state[data.address.state],
        // });
      } catch (e) {
        console.log("ERRO AO OBTER API");
      } finally {
        loading.value = false;
      }
    },
    function (error) {
      // callback de erro
      alert("Erro ao obter localização!");
      console.log("Erro ao obter localização.", error);
      loading.value = false;
    }
  );
}
function selectLocal(city: string, uf: string) {
  userStore.local.city = city;
  userStore.local.uf = uf;
  fechar();
}
</script>

<template>
  <div :class="visibilidade ? 'janela aberta' : 'janela fechada'">
    <div class="moldura">
      <div class="local">
        <div class="header">
          <h2 class="title">Em qual cidade você está?</h2>
          <CloseBlackIcon @click="fechar"></CloseBlackIcon>
        </div>
        <TextFieldIcon placeholder="" color="#1B7E6C" v-model="city" class="local-input">
          <SearchIcon></SearchIcon>
        </TextFieldIcon>
        <div class="meulocal" @click="getLocation">
          <LocalIcon></LocalIcon>
          <p>Usar minha localização atual</p>
        </div>
        <div class="locais">
          <div v-if="loading" style="display: flex;justify-content: center;" class="mt-10 pt-10">
            <Loading />
          </div>
          <p v-else-if="!locais.length" class="mt-10 pt-10" style="text-align: center; font-size: 20px;">Não foi possivel
            buscar sua cidade!
          </p>
          <template v-else>
            <div v-for="local in locais" :key="local.city" class="endereco" @click="selectLocal(local.city, local.uf)">
              <p>{{ local.city }} - {{ local.uf }}</p>
              <hr />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (min-width: 2000px) {
  .janela {
    justify-content: center !important;
    align-items: center !important;

    .moldura {
      width: 600px;
      min-height: 50%;
    }

    .local-input,
    .local-input :deep(.text-field) {
      width: 100% !important;
    }
  }
}

.janela {
  justify-content: end;
  align-items: unset;
}

.moldura {
  transform: translate(150vw, 0);
  transition: all 0.5s ease;
  height: auto;
  background: #fff;
  color: #2a2a2a;
  padding: 30px;
  width: 550px;

  .local {
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      justify-content: space-between;

      svg {
        cursor: pointer;
      }

      .title {
        font-size: 24px;
        margin: 0;
        font-weight: 700;
      }
    }

    .meulocal {
      display: flex;
      align-items: center;
      color: #1b7e6c;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 20px;
      cursor: pointer;

      p {
        margin-left: 15px;
      }
    }

    .locais {
      .endereco {
        cursor: pointer;

        p {
          margin-top: 12px;
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 400;
          margin-left: 24px;
          line-height: 18.4px;
        }

        hr {
          border-color: #ccc;
          background-color: #ccc;
        }
      }
    }
  }
}

@media (max-width: 650px) {
  .moldura {
    padding: 30px 15px;
    height: 100%;
    width: 100%;

    .local .text-field {
      width: 100%;
    }
  }
}
</style>
