<script setup lang="ts">
import Produto from "./Produto.vue";

const prods = [
  {
    img: "monte",
    redirect: "https://algartelecom.com.br/monte-seu-pacote",
  },
  {
    img: "recarga",
    redirect:
      "https://api.whatsapp.com/send?phone=5534998670012&text=Quero%20fazer%20recarga%20pelo%20WhatsApp",
  },
  {
    img: "casaon",
    redirect: "https://algartelecom.com.br/para-voce/casaon",
  },
  {
    img: "5gchegou",
    redirect: "https://algartelecom.com.br/5g ",
  },
  {
    img: "digitais",
    redirect: "https://algartelecom.com.br/para-voce/svas",
  },
];
</script>

<template>
  <div class="produtos">
    <h3 class="titulo">Aproveite o máximo da Algar</h3>
    <p class="body">Soluções e novidades exclusivas da Algar Telecom</p>
    <div class="list-produtos">
      <Produto v-for="prod in prods" :key="prod.img" :produto="prod"></Produto>
    </div>
  </div>
</template>

<style scoped lang="scss">
.produtos {
  display: flex;
  flex-direction: column;
  height: 100%;
  .titulo {
    margin: 0;
    color: #2a2a2a;
    font-size: 30px;
    font-weight: 700;
  }
  .body {
    color: #2a2a2a;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .list-produtos {
    display: flex;
    height: 100%;
    overflow-x: auto;
  }
}
@media (max-width: 750px) {
  .produtos {
    .titulo {
      font-size: 20px;
    }
    .body {
      font-size: 12px;
    }
  }
}
</style>
