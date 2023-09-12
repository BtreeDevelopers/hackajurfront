<script setup lang="ts">
import Pessoal from "@/components/profile/Pessoal.vue";
import Endereco from "@/components/profile/Endereco.vue";
</script>

<template>
  <div class="profile">
    <Pessoal class="forms1"></Pessoal>
    <Endereco class="forms2"></Endereco>
  </div>
</template>

<style scoped lang="scss">
.profile {
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 40px;
  align-items: center;
  .forms1 {
    margin-right: 30px;
    height: 500px;
  }
  .forms2 {
    margin-left: 30px;
    height: 500px;
  }
}
@media (max-width: 750px) {
  .profile {
    flex-direction: column;
    height: auto;
    .forms1 {
      margin-right: 0px;
      margin-bottom: 40px;
    }
    .forms2 {
      margin-left: 0px;
    }
  }
}
</style>
