<script setup>
import { userTableFn } from "./hooks.ts"
const { handleCheck, handleEdit, handleDelete, currentChange, tableData, addData, formPage } = userTableFn()
</script>

<template>
  <div>
    {{ tableData }}
    <el-button plain @click="addData">添加</el-button>
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column label="用户名" width="300">
        <template #default="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="角色" width="300">
        <template #default="scope">
          <el-tag>{{ scope.row.roles }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="phone" label="手机号" width="300" />
      <el-table-column property="email" label="邮箱" width="300" />
      <el-table-column label="状态" width="300">
        <template #default="scope">
          <el-tag>{{ (scope.row.status = true ? "Yes" : "No") }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="createTime" label="创建时间" width="300" />
      <el-table-column property="createTime" label="操作" width="300">
        <template #default="scope">
          <el-button type="primary" @click="handleCheck(scope.row)"> 查看 </el-button>
          <el-button type="primary" @click="handleDetails(scope.row)"> 跳转 </el-button>
          <el-button type="primary" @click="handleEdit(scope.row)"> 编辑 </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="example-pagination-block">
      <el-pagination
        layout="prev, pager, next"
        :total="formPage.total"
        :page-size="formPage.pageSize"
        :current-page="formPage.currentPage"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>
