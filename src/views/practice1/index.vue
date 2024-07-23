<script lang="ts" setup>
import { ref } from "vue"
import Son1 from "./son1.vue"
const data = ref("第一次内容")
const hanglechange = () => {
  data.value.method()
}
</script>

<template>
  <div class="app-container">
    <div>父元素</div>
    <div>data:{{ data }}</div>
    <button @click="hanglechange">父元素修改按钮</button>
    <Son1 v-model="data" />
  </div>
</template>

<style lang="scss" scoped></style>
