<script lang="ts" setup>
import { useRouter } from "vue-router"
const router = useRouter()
const hangleGo = () =>{
  router.go(-1)
}
</script>

<template>
  <div class="app-container">
    <button @click="hangleGo">返回</button>
    <span>我是div</span>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  margin-top: 400px;
  margin-left: 400px;
}
</style>