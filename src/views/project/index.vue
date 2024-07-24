<script lang="ts" setup>
// import {ElCard,ElRadioButton} from "element-plus"
import { Search } from "@element-plus/icons-vue"

import TableData from "./tableData.vue"
import TableDislog from "./Tabledialog.vue"
import TableSearchFormVue from "./TableSearchForm.vue"
import { onclickObj } from "./const.ts"
import { userTableFn } from "./hooks.ts"
</script>
<template>
  <div class="contenr">
    <!-- 搜索表单 -->
    <TableSearchFormVue />
    <el-card>
      <!-- 表格 -->
      <TableData />

      <TableDislog />
    </el-card>
  </div>
</template>
<style lang="scss" scoped></style>
