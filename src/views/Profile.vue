<script setup lang="ts">
import Pessoal from "@/components/profile/Pessoal.vue";
import Endereco from "@/components/profile/Endereco.vue";
import Loading from "@/components/Loading.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { getUserDetail } from "@/services/hacka"
const userStore = useUserStore();
const loading = ref(false)
onMounted(() => {
  getUser()
})
async function getUser() {
  try {
    loading.value = true
    const dataUser = await getUserDetail(userStore._id);
    userStore.setAllUser(dataUser.user);
  } finally {
    loading.value = false
  }

}
</script>

<template>
  <div class="profile">
    <div v-if="loading" class="loading-screen">
      <Loading :size="2"></Loading>
    </div>
    <template v-else>
      <Pessoal class="forms1"></Pessoal>
      <Endereco class="forms2"></Endereco>

    </template>
  </div>
</template>

<style scoped lang="scss">
.laoding-screen {
  display: flex;
  justify-content: center;
  align-items: center;
}

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
