<script setup>
const indexconfilm = () =>{
  emitter.emit("onclickMessage", {
    title:'这是传递给组件二的数据'
  })
}
</script>
<template>
    <div>我是div1</div>
    <button @click="indexconfilm">点击按钮 组件二接受</button>
</template>