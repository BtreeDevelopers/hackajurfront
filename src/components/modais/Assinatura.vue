<script lang="ts" setup>
import "@/assets/modal.scss";
import { ref, watch, computed } from "vue";
import CloseIcon from "@/components/icons/CloseIconGreen.vue";
import UploadIcon from "@/components/icons/UploadIcon.vue";
import Button from "@/components/Button.vue";
import TextField from "@/components/TextField.vue";
import Signature from "@/components/Signature.vue";
const props = defineProps<{
  status: boolean;
  nome: string;
  assinatura: string;
  sigla: string;
}>();
const emit = defineEmits<{
  "update:status": [val: boolean];
  "update:assinatura": [val: string];
  "update:sigla": [val: string];
}>();
const visibilidade = ref(false);
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
const sigla = computed(() => {
  const palavras = props.nome.split(" ");

  // Inicialize uma variável para armazenar as iniciais
  let iniciais = "";

  // Itere sobre cada palavra e adicione a inicial à string de iniciais
  for (const palavra of palavras) {
    iniciais += palavra.charAt(0).toUpperCase();
  }

  // Retorne as iniciais em maiúsculas
  return iniciais;
});

const signaturePad = ref<InstanceType<typeof Signature> | null>(null);
const siglaPad = ref<InstanceType<typeof Signature> | null>(null);
const selected = ref("Desenhar");
function fechar() {
  signaturePad.value?.clear();
  siglaPad.value?.clear();
  emit("update:status", false);
}
function salvarAssinatura() {
  fechar();
}
const assinaturaImg = ref("");
const siglaImg = ref("");
watch(
  () => props.assinatura,
  () => {
    assinaturaImg.value = props.assinatura;
  },
  { immediate: true }
);
watch(
  () => props.sigla,
  () => {
    siglaImg.value = props.sigla;
  },
  { immediate: true }
);
function uploadFile(tipo: "assinatura" | "sigla") {
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
    // console.log("file - para api", file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // this.image = reader.result;
      if (tipo == "assinatura") assinaturaImg.value = reader.result as string;
      else siglaImg.value = reader.result as string;
    };
  };
  input.click();
}
watch(
  () => assinaturaImg.value,
  (value) => {
    emit("update:assinatura", value);
  }
);
watch(
  () => siglaImg.value,
  (value) => {
    emit("update:sigla", value);
  }
);
</script>

<template>
  <div :class="visibilidade ? 'janela aberta' : 'janela fechada'">
    <div class="moldura">
      <div class="assinatura">
        <div class="header">
          <h2 class="title">Personalize a sua assinatura</h2>
          <CloseIcon @click="fechar" class="icon"></CloseIcon>
        </div>
        <div class="infos">
          <TextField
            readonly
            :modelValue="props.nome"
            width="50%"
            class="local-input"
          ></TextField>
          <TextField
            readonly
            :modelValue="sigla"
            width="40%"
            class="local-input"
          ></TextField>
        </div>

        <div class="slider">
          <div
            class="mr-5"
            :class="{ selected: selected == 'Desenhar' }"
            @click="selected = 'Desenhar'"
          >
            <p>Desenhar</p>
            <hr v-if="selected === 'Desenhar'" />
          </div>
          <div
            @click="selected = 'Carregar'"
            :class="{ selected: selected == 'Carregar' }"
          >
            <p>Carregar</p>
            <hr v-if="selected === 'Carregar'" />
          </div>
        </div>

        <div class="draw-canva" v-if="selected === 'Desenhar'">
          <div>
            <p class="text">Assinatura</p>
            <div class="assinaturas-canva large">
              <CloseIcon class="icon-close" @click="signaturePad?.clear()" />
              <Signature
                ref="signaturePad"
                width="290px"
                height="150px"
                @signature="(v) => (assinaturaImg = v)"
              />
            </div>
          </div>
          <div>
            <p class="text">Iniciais</p>
            <div class="assinaturas-canva">
              <CloseIcon class="icon-close" @click="siglaPad?.clear()" />
              <Signature
                ref="siglaPad"
                width="260px"
                height="150px"
                @signature="(v) => (siglaImg = v)"
              />
            </div>
          </div>
        </div>
        <div class="draw-canva" v-if="selected === 'Carregar'">
          <div>
            <p class="text">Assinatura</p>
            <div
              class="upload-canvas large"
              :class="{ uploaded: !!assinaturaImg }"
              @click="uploadFile('assinatura')"
            >
              <CloseIcon
                class="icon-close"
                v-if="assinaturaImg"
                @click.prevent.stop="assinaturaImg = ''"
              />
              <UploadIcon v-if="!assinaturaImg"></UploadIcon>
              <img :src="assinaturaImg" v-else />
            </div>
          </div>
          <div>
            <p class="text">Iniciais</p>
            <div
              class="upload-canvas"
              :class="{ uploaded: !!siglaImg }"
              @click="uploadFile('sigla')"
            >
              <CloseIcon
                class="icon-close"
                v-if="siglaImg"
                @click.prevent.stop="siglaImg = ''"
              />
              <UploadIcon v-if="!siglaImg"></UploadIcon>
              <img :src="siglaImg" v-else />
            </div>
          </div>
        </div>
        <div style="text-align: end">
          <Button @click="salvarAssinatura">Salvar assinatura</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.moldura {
  height: auto;
  background: #fff;
  color: #000;
  padding: 30px;
  overflow: auto;
  .infos {
    display: flex;
    justify-content: space-between;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;

    .title {
      color: #055550;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }

    .icon {
      transform: scale(1.5);
    }
  }

  .slider {
    display: flex;
    cursor: pointer;
    margin-top: 40px;

    hr {
      margin-top: 1px;
    }

    .selected {
      font-weight: bold;
    }
  }

  .draw-canva {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 10px;

    .text {
      color: #1b7e6c;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }

  .assinaturas-canva {
    border: 1px solid #1b7e6c;
    border-radius: 10px;
    position: relative;
    width: 230px;
    height: 150px;
    overflow: hidden;

    .icon-close {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 5px;
      margin-right: 5px;
      cursor: pointer;
    }
  }

  .upload-canvas {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #1b7e6c;
    border-radius: 10px;
    background-color: #f7f6f9;
    width: 230px;
    height: 150px;
    cursor: pointer;
    overflow: hidden;
    position: relative;

    .icon-close {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 5px;
      margin-right: 5px;
      cursor: pointer;
    }
  }

  .uploaded {
    border: 1px solid #1b7e6c;
  }

  .large {
    width: 290px;
  }
}

@media (max-width: 750px) {
}

@media (max-width: 600px) {
  .moldura {
    padding: 30px 15px;
    height: 100%;
    width: 100%;
    .assinatura {
      width: 100%;
    }
    .infos {
      flex-direction: column;
      .local-input,
      .local-input :deep(.text-field) {
        width: 100% !important;
      }
    }
    .draw-canva {
      display: flex;
      flex-direction: column;
      & > div:first-child {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
