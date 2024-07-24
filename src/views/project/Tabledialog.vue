<template>
  <!-- 表单 -->
  <el-dialog v-model="centerDialogVisible" :title="onclickObj[optionNane]" width="500" align-center>
    <el-form label-width="auto" style="max-width: 600px; margin-top: 10px" :model="formData" :inline="true">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入" v-model="formData.username"
      /></el-form-item>
      <el-form-item label="邮箱" prop="email"> <el-input placeholder="请输入" v-model="formData.email" /></el-form-item>
      <el-form-item label="手机号" prop="phone" v-if="optionNane === 'check'">
        <el-input placeholder="请输入" v-model="formData.phone"
      /></el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" v-if="optionNane === 'check'" @click="centerDialogVisible = false"> 确认 </el-button>
        <el-button type="primary" v-else @click="buttonConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
// import { defineProps } from "vue"
import { userTableFn } from "./hooks.ts"
import { onclickObj } from "./const.ts"
// const props = defineProps(["centerDialogVisible"])
const { centerDialogVisible, optionNane, formData, buttonConfirm } = userTableFn()

</script>

<style></style>
