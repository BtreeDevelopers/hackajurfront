<script setup lang="ts">
import CameraIcon from "../icons/CameraIcon.vue";
import TextField from "../TextField.vue";
import Select from "../Select.vue";
import Button from "../Button.vue";
import CloseIcon from "@/components/icons/CloseIconGreen.vue";
import ModalAssinatura from "@/components/modais/Assinatura.vue"
import { computed, onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { mascaraCpf, mascaraCnpj } from "@/composables/TaxIdMask";
import { mascaraData } from "@/composables/DateMask";
import { usePhoneMask } from "@/composables/PhoneMask";
const userStore = useUserStore();
const { updatePhoneNumber, phoneNumberWithoutMask, setPhone, phoneNumber } = usePhoneMask();
onMounted(() => {
  setPhone(userStore.celular);
})
watch(() => phoneNumberWithoutMask.value, (value) => {
  if (value && value !== userStore.celular) {
    userStore.celular = value;
  }
})
const taxid = computed(() => {
  return userStore.cpf_cnpj.length === 11 ? mascaraCpf(userStore.cpf_cnpj) : mascaraCnpj(userStore.cpf_cnpj)
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
function uploadFile() {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = () => {
    const file = (input.files as any)[0];
    // if (file.size >= 5000000) {
    //   //IMAGEM PESADA
    //   return;
    // }
    // this.file = file;
    console.log('file - para api', file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // this.image = reader.result;

      userStore.fotoPerfil = reader.result as string;
    };
  };
  input.click();
}
async function enviarDados() {
  try {
    loading.value = true;


  } finally {
    loading.value = false;

  }
}

</script>

<template>
  <div class="pessoal">
    <ModalAssinatura v-model:status="modal" nome="Teste Teste"></ModalAssinatura>
    <p class="title">Dados Pessoais</p>
    <div class="base">
      <div class="picture" @click="uploadFile">
        <img class="foto" :src="userStore.fotoPerfil" v-if="userStore.fotoPerfil" />
        <img class="foto void" src="@/assets/foto.png" v-else />
        <div class="filter">
          <CameraIcon></CameraIcon>
        </div>
      </div>
      <div class="data">
        <TextField :readonly="true" value="Nome Teste" placeholder="Nome Completo" color="#1B7E6C" width="100%"
          v-model="userStore.nome">
        </TextField>
        <div class="divider">
          <TextField class="input-divider-1" :readonly="true" :model-value="taxid" placeholder="CPF" color="#1B7E6C">
          </TextField>
          <TextField class="input-divider-2" :readonly="true" :model-value="mascaraData(userStore.dataNascimento)"
            placeholder="Data de Nascimento" color="#1B7E6C"></TextField>
        </div>
        <TextField placeholder="Nacionalidade" color="#1B7E6C" width="100%" readonly model-value="Brasileiro"></TextField>
        <Select placeholder="Estado Civil" color="#1B7E6C" :items="estadoCivil" v-model="userStore.estadoCivil"
          width="100%"></Select>
        <TextField placeholder="*Telefone celular" color="#1B7E6C" width="100%" @input="updatePhoneNumber"
          :model-value="phoneNumber"></TextField>
        <TextField placeholder="Email" color="#1B7E6C" width="100%" v-model="userStore.email"></TextField>

        <div class="assinaturas">
          <div class="model">
            <p class="assinaturas-titulo">Assinatura</p>
            <div class="assinaturas-canva" @click="modal = true">
              <CloseIcon class="icon-close" />
              <img :src="userStore.assinatura" v-if="userStore.assinatura" alt="" width="200" height="100">
              <img src="@/assets/void.png" v-else alt="" width="200" height="100">
            </div>
          </div>
          <div class="model">
            <p class="assinaturas-titulo">Inicias</p>
            <div class="assinaturas-canva" @click="modal = true">
              <CloseIcon class="icon-close" />
              <img :src="userStore.iniciais" v-if="userStore.iniciais" alt="" width="200" height="100">
              <img src="@/assets/void.png" v-else alt="" width="200" height="100">
            </div>
          </div>
        </div>
        <div class="action">
          <Button @click="enviarDados">Salvar</Button>
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
      margin-bottom: 20px;

      .model:first-child {
        margin-right: 24px;
      }

      .model {
        flex: 1;

        .assinaturas-titulo {
          color: #1B7E6C;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .assinaturas-canva {
          border: 1px solid #1B7E6C;
          border-radius: 10px;
          position: relative;
          width: 200px;
          height: 100px;
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

  .picture {
    position: relative;
    height: 80px;
    width: 80px;
    cursor: pointer;
    margin-right: 20px;

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
      background: linear-gradient(0deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.5) 100%);
      align-items: center;
      justify-content: center;
    }
  }
}

@media (max-width: 600px) {
  .pessoal .base {
    flex-direction: column;

    .picture {
      margin-bottom: 30px;
    }
  }
}
</style>
