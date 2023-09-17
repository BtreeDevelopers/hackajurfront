<script setup lang="ts">
import TextField from "../TextField.vue";
import Select from "../Select.vue";
import Button from "../Button.vue";
import { ref, onMounted, watch } from "vue";
import { useTaxIdMask } from "@/composables/TaxIdMask";
import { useUserStore } from "@/stores/user";
// import { updateUser } from "@/services/hacka";
// import { useToast } from "vue-toastification";
const userStore = useUserStore();
// const toast = useToast();
const { setCpfCnpj, updateCpfCnpj, cpfCnpj, cpfCnpjWithoutMask } =
  useTaxIdMask();
onMounted(() => {
  setCpfCnpj(userStore.cpf_cnpj);
});
watch(
  () => cpfCnpjWithoutMask.value,
  (value) => {
    if (value !== userStore.cpf_cnpj) {
      userStore.cpf_cnpj = value;
    }
  }
);

const loading = ref(false);
async function enviarDados() {
  // try {
  //   loading.value = true;
  //   const data = new FormData();
  //   data.append("userId", userStore._id);
  //   data.append("cep", userStore.cep);
  //   data.append("uf", userStore.uf);
  //   data.append("cidade", userStore.cidade);
  //   data.append("bairro", userStore.bairro);
  //   data.append("rua", userStore.rua);
  //   data.append("numero", userStore.numero);
  //   data.append("complemento", userStore.complemento);
  //   await updateUser(data);
  //   toast.success("Dados de endereço atualizados com sucesso.");
  // } catch (e) {
  //   toast.error("Erro ao atualizar dados de endereço");
  // } finally {
  //   loading.value = false;
  // }
}
</script>

<template>
  <div class="juridico">
    <p class="title">Dados de jurídico</p>
    <div class="base">
      <TextField
        :readonly="true"
        placeholder="CNPJ"
        color="#1B7E6C"
        width="100%"
        @input="updateCpfCnpj"
        :model-value="cpfCnpj"
      ></TextField>
      <TextField
        placeholder="Nome da empresa"
        color="#1B7E6C"
        width="100%"
      ></TextField>
      <Select
        :items="[
          { text: 'Público', value: 'publico' },
          { text: 'Privado', value: 'privado' },
        ]"
        model-value="privado"
        color="#1B7E6C"
      ></Select>

      <div class="action">
        <Button @click="enviarDados" :loading="loading">Salvar</Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.juridico {
  min-width: 340px;
  .title {
    color: #055550;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  .base {
    display: flex;
    flex-direction: column;

    .action {
      text-align: end;
    }
  }
}
</style>
