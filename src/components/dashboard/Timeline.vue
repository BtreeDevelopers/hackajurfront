<script setup lang="ts">
withDefaults(
  defineProps<{
    active?: number;
    expandir?: { size: string; id: number };
  }>(),
  {
    active: 0,
    expandir: () => ({
      size: "0px",
      id: 0,
    }),
  }
);
</script>

<template>
  <div class="timeline">
    <div class="line"></div>
    <div class="numbers">
      <div
        class="card"
        :class="{ select: active >= 1, expandir: expandir?.id === 1 }"
      >
        1
      </div>
      <div
        class="card"
        :class="{ select: active >= 2, expandir: expandir?.id === 2 }"
      >
        2
      </div>
      <div
        class="card"
        :class="{ select: active >= 3, expandir: expandir?.id === 3 }"
      >
        3
      </div>
      <div
        class="card"
        :class="{ select: active >= 4, expandirinvertido: expandir?.id === 4 }"
      >
        4
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.timeline {
  position: relative;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  .numbers {
    position: absolute;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .card {
      width: 25px;
      height: 25px;
      background-color: #d9d9d9;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: #055550;
      font-size: 18px;
      font-weight: 700;
    }
    .expandir {
      margin-bottom: v-bind("expandir.size");
    }
    .expandirinvertido {
      margin-top: v-bind("expandir.size");
    }
    .select {
      background-color: #055550;
      color: #fff;
    }
  }
  .line {
    position: absolute;
    height: 100%;
    width: 0;
    border: 1px solid #d9d9d9;
  }
}
</style>
