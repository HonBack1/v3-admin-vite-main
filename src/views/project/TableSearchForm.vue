<template>
  <el-card class="search-form">
    <el-form
      label-width="auto"
      style="max-width: 600px; margin-top: 10px"
      :model="changData"
      ref="ruleFormRef"
      :inline="true"
    >
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入" v-model="changData.username"
      /></el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入" v-model="changData.email"
      /></el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch()">查询</el-button>
        <el-button type="primary" :icon="Search" @click="hangeleReset(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { userTableFn } from "./hooks.ts"
import { Search } from "@element-plus/icons-vue"
// import {}
const { handleSearch, hangeleReset, ruleFormRef, changData } = userTableFn()
</script>

<style></style>
