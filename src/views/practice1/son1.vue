<script setup>
import { ref, defineExpose } from "vue"
const name = ref("默认样式")
const method = () => {
  console.log(name.value)
  name.value = "更换内容2"
}
const onclick = (val) => {
  name.value = val
}
defineExpose({
  name,
  method
})
</script>
<template>
  <div>11111</div>
  <div>{{ name }}</div>
  <button @click="onclick('更换内容1')">更换内容1</button>
</template>
