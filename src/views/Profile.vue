<script setup lang="ts">
import Pessoal from "@/components/profile/Pessoal.vue";
import Endereco from "@/components/profile/Endereco.vue";
import Loading from "@/components/Loading.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { getUserDetail } from "@/services/hacka";
import Juridico from "@/components/profile/Juridico.vue";
const userStore = useUserStore();
const loading = ref(false);
onMounted(() => {
  getUser();
});
async function getUser() {
  try {
    loading.value = true;
    const dataUser = await getUserDetail(userStore._id);
    userStore.setAllUser(dataUser.user);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="profile">
    <div v-if="loading" class="loading-screen">
      <Loading :size="2"></Loading>
    </div>
    <template v-else>
      <div class="forms-geral">
        <Pessoal class="forms1"></Pessoal>
        <Endereco class="forms2"></Endereco>
      </div>
      <Juridico class="forms3" v-if="userStore.isPJ"></Juridico>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  align-items: center;
  .forms-geral {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .forms1 {
    margin-right: 30px;
    min-height: 500px;
  }

  .forms2 {
    margin-left: 30px;
  }
  .forms3 {
    margin-top: 30px;
  }
}
@media (min-width: 1920px) {
  .profile {
    flex-direction: row;
    .forms3 {
      margin-left: 60px;
    }
  }
}
@media (max-width: 870px) {
  .profile {
    .forms-geral {
      flex-direction: column;

      height: auto;
    }

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
