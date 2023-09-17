<script lang="ts" setup>
import "@/assets/modal.scss";
import TextField from "@/components/TextField.vue";
import Assinatura from "./Assinatura.vue";
import Button from "../Button.vue";
import { ref, watch } from "vue";
const props = defineProps<{
  status: boolean;
}>();
// const emit = defineEmits<{
//   "update:status": [val: boolean];
// }>();
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
// function fechar() {
//   emit("update:status", false);
// }
const image = ref("");
function criarInputFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*"; // Aceitar apenas imagens
  input.capture = "camera"; // Usar a câmera traseira do dispositivo, se disponível

  // Adicionar um ouvinte de eventos para quando o arquivo for selecionado
  input.addEventListener("change", function () {
    const file = input.files![0];
    if (file) {
      // Lê o arquivo e exibe a imagem
      const reader = new FileReader();
      reader.onload = function (e) {
        image.value = e.target!.result as string;
      };
      reader.readAsDataURL(file);
    }
  });

  input.click();
}
const modal = ref(false);
const assinatura = ref("");
const sigla = ref("");
</script>

<template>
  <div :class="visibilidade ? 'janela aberta' : 'janela fechada'">
    <Assinatura
      v-model:status="modal"
      v-model:assinatura="assinatura"
      v-model:sigla="sigla"
      nome="Teste Teste"
    ></Assinatura>
    <div class="moldura">
      <div class="QRCode">
        <div class="header">
          <h2 class="title">Confirme sua identidade</h2>
        </div>
        <div>
          <TextField placeholder="*Nome completo" width="100%"></TextField>
          <TextField placeholder="*CPF" width="100%"></TextField>
          <div class="photo" @click="criarInputFile">
            <img v-if="!image" src="@/assets/user.png" alt="" />
            <img v-else :src="image" alt="" height="130" />
          </div>
          <Button width="100%" @click="modal = true">Confirmar</Button>
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
  .photo {
    border: 1px dashed #1b7e6c;
    width: 100%;
    height: 132px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
@media (max-width: 750px) {
  .moldura {
    width: 100%;
    height: 100%;
  }
}
</style>
