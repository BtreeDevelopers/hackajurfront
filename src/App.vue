<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="hackajur">
    <Header></Header>

    <RouterView></RouterView>

    <Footer></Footer>
  </div>
</template>

<style scoped lang="scss">
.hackajur {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
</style>
