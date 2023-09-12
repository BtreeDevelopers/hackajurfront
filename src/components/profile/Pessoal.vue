<script setup lang="ts">
import CameraIcon from "../icons/CameraIcon.vue";
import TextField from "../TextField.vue";
import Select from "../Select.vue";
import Button from "../Button.vue";
const nacionalidade = [
  {
    text: "Brasileiro",
    value: "brasileiro",
  },
];
const estadoCivil = [
  {
    text: "Solteiro",
    value: "solteiro",
  },
  {
    text: "Casado",
    value: "casado",
  },
];
</script>

<template>
  <div class="pessoal">
    <p class="title">Dados Pessoais</p>
    <div class="base">
      <div class="picture">
        <img class="foto" src="@/assets/foto.png" />
        <div class="filter">
          <CameraIcon></CameraIcon>
        </div>
      </div>
      <div class="data">
        <TextField
          :readonly="true"
          value="Nome Teste"
          placeholder="Nome Completo"
          color="#1B7E6C"
          width="100%"
        ></TextField>
        <div class="divider">
          <TextField
            class="input-divider-1"
            :readonly="true"
            value="000.000.000-00"
            placeholder="CPF"
            color="#1B7E6C"
          ></TextField>
          <TextField
            class="input-divider-2"
            :readonly="true"
            value="00/00/0000"
            placeholder="Data de Nascimento"
            color="#1B7E6C"
          ></TextField>
        </div>
        <Select
          placeholder="Nacionalidade"
          color="#1B7E6C"
          model-value="brasileiro"
          :readonly="true"
          :items="nacionalidade"
          width="100%"
        ></Select>
        <Select
          placeholder="Estado Civil"
          color="#1B7E6C"
          model-value="solteiro"
          :items="estadoCivil"
          width="100%"
        ></Select>
        <TextField
          placeholder="*Telefone celular"
          color="#1B7E6C"
          width="100%"
        ></TextField>
        <TextField placeholder="Email" color="#1B7E6C" width="100%"></TextField>
        <div class="action">
          <Button>Salvar</Button>
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
    .picture {
      margin-bottom: 30px;
    }
  }
}
</style>
