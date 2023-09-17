<script lang="ts" setup>
import "@/assets/modal.scss";
import CloseIcon from "@/components/icons/CloseIconGreen.vue";
import { ref, watch } from "vue";
const props = defineProps<{
  status: boolean;
}>();
const emit = defineEmits<{
  "update:status": [val: boolean];
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
function fechar() {
  emit("update:status", false);
}
</script>

<template>
  <div :class="visibilidade ? 'janela aberta' : 'janela fechada'">
    <div class="moldura">
      <div class="QRCode">
        <div class="header">
          <h2 class="title">Continue Pelo telefone</h2>
          <CloseIcon @click="fechar" class="icon"></CloseIcon>
        </div>
        <div style="text-align: center" class="mb-10">
          <img src="@/assets/qr_code1.png" alt="" width="300" />
        </div>
        <div></div>
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
  .QRCode {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        color: #055550;
        font-size: 20px;
        font-weight: 700;
      }
      .icon {
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 750px) {
  .moldura {
    width: 100%;
    height: 100%;
  }
}
</style>
