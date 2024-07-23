<script lang="ts" setup>
// import {ElCard,ElRadioButton} from "element-plus"
import { getTableDataApi, createTableDataApi, deleteTableDataApi, updateTableDataApi } from "../../api/table/index"
import { Search } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { ref } from "vue"
import { add, flatMap } from "lodash-es"

import Index1 from "./index1.vue"
import Index2 from "./index2.vue"
import TableData from "./tableData.vue"

const tableData = ref([])
const optionNane = ref()
const ruleFormRef = ref()
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)
const centerDialogVisible = ref(false)
// 搜索条件
const changData = ref({
  username: "",
  email: ""
})
//页码获取
const currentChange = (val) => {
  getDataTable(val)
}
// 添加
const formData = ref({
  username: "",
  email: ""
})
const addData = () => {
  centerDialogVisible.value = true
  optionNane.value = "add"
  // tableData.value = addDataList.value
  // console.log(tableData.value)
}
const buttonConfirm = () => {
  const api = optionNane.value === "add" ? createTableDataApi : updateTableDataApi
  api({
    username: formData.value.username,
    email: formData.value.email
  })
    .then((res) => {
      console.log(res)
      formData.value = []
      getDataTable()
    })
    .finally(() => {
      centerDialogVisible.value = false
    })

  // tableData.value = ref([])
}
// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm("确定删除?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteTableDataApi(row.id).then(() => {
      getDataTable()
      ElMessage({
        type: "success",
        message: "Delete completed"
      })
    })
  })
}
//编辑

const handleEdit = (row) => {
  centerDialogVisible.value = true
  optionNane.value = "edit"
  formData.value = { ...row }
}
// const editConfirm = () => {
//   updateTableDataApi(formData.value).then((res) => {
//     console.log(res)
//     formData.value = []
//     getDataTable()
//   })
// }
//查看
const handleCheck = (row) => {
  optionNane.value = "check"
  centerDialogVisible.value = true
  // console.log(row)
  formData.value = row
}
// const checkConfirm = () => {
//   centerDialogVisible.value = false
//   // formData.value = []
// }
// 查询条件
const getDataTable = (page) => {
  getTableDataApi({
    currentPage: page || 1,
    size: 10,
    username: changData.value.username,
    email: changData.value.email
  }).then((res) => {
    total.value = res.data.total
    tableData.value = res.data.list
  })
}
getDataTable({})
const handleSearch = () => {
  getDataTable()
}
const hangeleReset = (ruleRef) => {
  if (!ruleRef) return
  ruleRef.resetFields()
  getDataTable()
}
</script>

<template>
  <div class="contenr">
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
          <Index1 />
          <Index2 />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch()">查询</el-button>
          <el-button type="primary" :icon="Search" @click="hangeleReset(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button plain @click="addData">添加</el-button>
      <!-- 表格 -->
      <TableData />
      <!-- 分页 -->
      <div class="example-pagination-block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="currentChange"
        />
      </div>
      <!-- 增加 -->
      <el-dialog
        v-model="centerDialogVisible"
        :title="optionNane === 'add' ? '增加' : optionNane === 'edit' ? '修改' : '查看'"
        width="500"
        align-center
      >
        <el-form label-width="auto" style="max-width: 600px; margin-top: 10px" :model="formData" :inline="true">
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入" v-model="formData.username"
          /></el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入" v-model="formData.email"
          /></el-form-item>
          <el-form-item label="手机号" prop="phone" v-if="optionNane === 'check'">
            <el-input placeholder="请输入" v-model="formData.phone"
          /></el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" v-if="optionNane === 'check'" @click="centerDialogVisible = false">
              确认
            </el-button>
            <el-button type="primary" v-else @click="buttonConfirm"> 确认 </el-button>
          </div>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.contenr {
  // .search-form {
  //   display: flex;
  // }
}
</style>
