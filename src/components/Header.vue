<script setup lang="ts">
import PinIcon from "@/components/icons/PinIcon.vue";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon.vue";
import AlgarIcon from "@/components/icons/AlgarIcon.vue";
import UserIcon from "./icons/UserIcon.vue";
import Localization from "./modais/Localization.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { computed, ref, watch, onMounted } from "vue";
const route = useRoute();
const userStore = useUserStore();
const getUserTitle = computed(() => {
  if (route.meta.header === "user") {
    return "Olá, " + userStore.nome.split(" ")[0];
  }
  return "";
});
const status = ref(false);
watch(
  () => [userStore.local.city, userStore.local.uf],
  () => {
    localStorage.setItem("local", JSON.stringify(userStore.local));
  }
);
onMounted(() => {
  const local = localStorage.getItem("local");
  if (local) {
    userStore.local = JSON.parse(local);
  }
});
</script>

<template>
  <Localization v-model:status="status"></Localization>
  <div class="header">
    <div class="header-title py-3">
      <div class="internal">
        <p class="title">Regularize suas dívidas</p>
        <div class="locate cursor-pointer" @click="status = true">
          <PinIcon></PinIcon>
          <p class="local mx-2">
            {{ userStore.local.city }}/{{ userStore.local.uf }}
          </p>
          <ArrowDownIcon></ArrowDownIcon>
        </div>
      </div>
    </div>
    <div class="header-base py-3">
      <div class="internal">
        <AlgarIcon></AlgarIcon>
        <div class="sub-menu">
          <RouterLink
            to="/sign"
            class="user cursor-pointer"
            v-if="route.meta.header === 'login'"
          >
            <UserIcon></UserIcon>
            <p class="login mx-1">Login</p>
          </RouterLink>
          <RouterLink
            to="/"
            class="user cursor-pointer"
            v-else-if="route.meta.header === 'voltar'"
          >
            <div class="rotate">
              <ArrowDownIcon></ArrowDownIcon>
            </div>
            <p class="login mx-1">Voltar</p>
          </RouterLink>
          <div
            class="user cursor-pointer"
            v-else-if="route.meta.header === 'user'"
          >
            <UserIcon></UserIcon>
            <p class="login mx-1">{{ getUserTitle }}</p>
          </div>
          <div class="locate cursor-pointer" @click="status = true">
            <PinIcon></PinIcon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  color: #ffffff;

  .header-title {
    .internal {
      max-width: 1920px;
      width: 100%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 80px;
      padding-right: 80px;
    }
    background: #055550;
    .title {
      font-size: 14px;
      font-weight: 700;
    }
    .locate {
      display: flex;
      align-items: center;
      .local {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  .header-base {
    .internal {
      max-width: 1920px;
      width: 100%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 80px;
      padding-right: 80px;
    }
    background: #1b7e6c;
    .user {
      display: flex;
      align-items: center;
      color: #fff;
      .rotate {
        transform: rotate(90deg);
      }
      .login {
        font-size: 12px;
        font-weight: 700;
      }
    }
    .locate {
      display: none;
    }
  }
}
@media (max-width: 750px) {
  .header .internal {
    padding-left: 30px !important;
    padding-right: 30px !important;
  }
}
@media (max-width: 500px) {
  .header .internal {
    padding-left: 30px;
    padding-right: 30px;
  }

  .header {
    .header-title {
      display: none;
    }
    .header-base {
      .login {
        display: none;
      }
      .locate {
        display: block;
      }
      .sub-menu {
        display: flex;
        .user {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
