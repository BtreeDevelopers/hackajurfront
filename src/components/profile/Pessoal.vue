<script setup lang="ts">
import CameraIcon from "../icons/CameraIcon.vue";
import TextField from "../TextField.vue";
import Select from "../Select.vue";
import Button from "../Button.vue";
import CloseIcon from "@/components/icons/CloseIconGreen.vue";
import ModalAssinatura from "@/components/modais/Assinatura.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { mascaraCpf, mascaraCnpj } from "@/composables/TaxIdMask";
import { mascaraData } from "@/composables/DateMask";
import { usePhoneMask } from "@/composables/PhoneMask";
import { updateUser } from "@/services/hacka";
import { useToast } from "vue-toastification";
const userStore = useUserStore();
const toast = useToast();
const { updatePhoneNumber, phoneNumberWithoutMask, setPhone, phoneNumber } =
  usePhoneMask();
onMounted(() => {
  setPhone(userStore.celular);
});
watch(
  () => phoneNumberWithoutMask.value,
  (value) => {
    if (value && value !== userStore.celular) {
      userStore.celular = value;
    }
  }
);
const taxid = computed(() => {
  return userStore.cpf_cnpj.length === 11
    ? mascaraCpf(userStore.cpf_cnpj)
    : mascaraCnpj(userStore.cpf_cnpj);
});

const estadoCivil = [
  {
    text: "Solteiro",
    value: "solteiro",
  },
  {
    text: "Casado",
    value: "casado",
  },
  {
    text: "Divorciado",
    value: "divorciado",
  },
  {
    text: "Viúvo",
    value: "viuvo",
  },
  {
    text: "União Estável",
    value: "uniao estavel",
  },
];
const modal = ref(false);
const loading = ref(false);
const imagemDoc = ref<any>(null);

function uploadFile() {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = () => {
    const file = input.files![0];
    imagemDoc.value = file as any;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      userStore.fotoPerfil = reader.result as string;
    };
  };
  input.click();
}

async function base64ToFile(base64: string) {
  const res = await fetch(base64);
  const buf = await res.arrayBuffer();
  const isJpeg = base64.includes("image/jpeg");
  const file = new File(
    [buf],
    String(Date.now()) + (isJpeg ? ".jpg" : ".png"),
    {
      type: isJpeg ? "image/jpeg" : "image/png",
    }
  );
  return file;
}
function isBase64Image(base64String: string) {
  // Verifique se a string começa com uma das assinaturas de tipo de imagem conhecidas
  return /^data:image\/(png|jpeg|jpg|gif);base64,/.test(base64String);
}

async function enviarDados() {
  try {
    loading.value = true;
    const data = new FormData();
    data.append("userId", userStore._id);
    data.append("estadoCivil", userStore.estadoCivil);
    data.append("celular", phoneNumberWithoutMask.value);
    data.append("email", userStore.email);
    // data.append("email", userStore.email);
    // data.append("cep", userStore.cep);
    // data.append("uf", userStore.uf);
    // data.append("cidade", userStore.cidade);
    // data.append("bairro", userStore.bairro);
    // data.append("rua", userStore.rua);
    // data.append("numero", userStore.numero);
    // data.append("tipo", userStore.tipo);

    if (userStore.fotoPerfil && isBase64Image(userStore.fotoPerfil)) {
      data.append("fotoPefil", imagemDoc.value);
    }
    if (userStore.assinatura && isBase64Image(userStore.assinatura)) {
      data.append("assinatura", await base64ToFile(userStore.assinatura));
    }
    if (userStore.iniciais && isBase64Image(userStore.iniciais)) {
      data.append("iniciais", await base64ToFile(userStore.iniciais));
    }
    await updateUser(data);
    toast.success("Dados pessoais atualizados com sucesso.");
  } catch (e) {
    toast.error("Erro ao atualizar dados pessoais");
  } finally {
    loading.value = false;
  }
}
const valoresBase: Record<number, string> = {
  0: "pessimo",
  20: "ruim",
  40: "neutro",
  60: "bom",
  80: "otimo",
};
const imageUrl = computed(() => {
  let status = "";
  for (const valor in valoresBase) {
    if (userStore.score >= parseInt(valor)) {
      status = valoresBase[valor];
    } else {
      break; // Saia do loop assim que encontrar o status adequado
    }
  }
  return new URL(`/src/assets/relacionamento/${status}.png`, import.meta.url)
    .href;
});
</script>

<template>
  <div class="pessoal">
    <ModalAssinatura
      v-model:status="modal"
      v-model:assinatura="userStore.assinatura"
      v-model:sigla="userStore.iniciais"
      :nome="userStore.nome"
    ></ModalAssinatura>
    <p class="title">Dados Pessoais</p>
    <div class="base">
      <div class="side">
        <div class="picture" @click="uploadFile">
          <img
            class="foto"
            :src="userStore.fotoPerfil"
            v-if="userStore.fotoPerfil"
          />
          <img class="foto void" src="@/assets/foto.png" v-else />
          <div class="filter">
            <CameraIcon></CameraIcon>
          </div>
        </div>
        <div class="relacionamento">
          <p class="title">Relacionamento Algar</p>
          <div class="icon">
            <img :src="imageUrl" alt="" width="30" />
          </div>
        </div>
      </div>
      <div class="data">
        <TextField
          :readonly="true"
          placeholder="Nome Completo"
          color="#1B7E6C"
          width="100%"
          v-model="userStore.nome"
        >
        </TextField>
        <div class="divider">
          <TextField
            class="input-divider-1"
            :readonly="true"
            :model-value="taxid"
            placeholder="CPF"
            color="#1B7E6C"
          >
          </TextField>
          <TextField
            class="input-divider-2"
            :readonly="true"
            :model-value="mascaraData(userStore.dataNascimento)"
            placeholder="Data de Nascimento"
            color="#1B7E6C"
          ></TextField>
        </div>
        <TextField
          placeholder="Nacionalidade"
          color="#1B7E6C"
          width="100%"
          readonly
          model-value="Brasileiro"
        ></TextField>
        <Select
          placeholder="Estado Civil"
          color="#1B7E6C"
          :items="estadoCivil"
          v-model="userStore.estadoCivil"
          width="100%"
        ></Select>
        <TextField
          placeholder="*Telefone celular"
          color="#1B7E6C"
          width="100%"
          @input="updatePhoneNumber"
          :model-value="phoneNumber"
        ></TextField>
        <TextField
          placeholder="Email"
          color="#1B7E6C"
          width="100%"
          v-model="userStore.email"
        ></TextField>

        <div class="assinaturas">
          <div class="model">
            <p class="assinaturas-titulo">Assinatura</p>
            <div class="assinaturas-canva" @click="modal = true">
              <CloseIcon
                class="icon-close"
                @click.stop="userStore.assinatura = ''"
              />
              <img
                :src="userStore.assinatura"
                v-if="userStore.assinatura"
                alt=""
                width="150"
                height="70"
              />
              <img
                src="@/assets/void.png"
                v-else
                alt=""
                width="150"
                height="70"
              />
            </div>
          </div>
          <div class="model">
            <p class="assinaturas-titulo">Iniciais</p>
            <div class="assinaturas-canva" @click="modal = true">
              <CloseIcon
                class="icon-close"
                @click.stop="userStore.iniciais = ''"
              />
              <img
                :src="userStore.iniciais"
                v-if="userStore.iniciais"
                alt=""
                width="150"
                height="70"
              />
              <img
                src="@/assets/void.png"
                v-else
                alt=""
                width="150"
                height="70"
              />
            </div>
          </div>
        </div>
        <div class="action">
          <Button @click="enviarDados" :loading="loading">Salvar</Button>
        </div>
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

    .data {
      display: flex;
      flex-direction: column;
    }

    .assinaturas {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .model {
        &:first-child {
          margin-right: 10px;
        }
        .assinaturas-titulo {
          color: #1b7e6c;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .assinaturas-canva {
          border: 1px solid #1b7e6c;
          border-radius: 10px;
          position: relative;
          width: 150px;
          height: 70px;
          overflow: hidden;
          cursor: pointer;

          .icon-close {
            position: absolute;
            top: 0;
            right: 0;
            margin-top: 5px;
            margin-right: 5px;
            cursor: pointer;
          }
        }
      }
    }

    .action {
      text-align: end;
    }

    .divider {
      display: flex;

      & .input-divider-1 {
        width: 50%;
      }

      & .input-divider-2 {
        width: 50%;
        margin-left: 10px;
      }
    }
  }
  .side {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
  .relacionamento {
    height: 80px;
    width: 80px;

    border-radius: 10px;
    position: relative;
    background: linear-gradient(90deg, #055550 0%, #1b7e6c 100%);
    margin-top: 10px;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 10px;
    }
    .title {
      margin-top: 10px;
      color: #fc0;
      text-align: center;
      font-size: 8px;
      font-weight: 700;
      margin-bottom: 0;
    }
  }
  .picture {
    position: relative;
    height: 80px;
    width: 80px;
    cursor: pointer;

    .filter,
    .foto {
      position: absolute;
      height: 80px;
      width: 80px;
    }

    .void {
      border: 1px solid #055550;
      border-radius: 10px;
    }

    .filter {
      display: flex;
      opacity: 0;

      &:hover {
        opacity: 1;
      }

      border-radius: 10px;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      align-items: center;
      justify-content: center;
    }
  }
}

@media (max-width: 600px) {
  .pessoal .base {
    flex-direction: column;
    .side {
      flex-direction: row;
      .relacionamento {
        margin-top: 0;
        margin-left: 20px;
      }
    }

    .picture {
      margin-bottom: 30px;
    }
  }
}
</style>
