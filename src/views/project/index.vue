<script lang="ts" setup>
// import {ElCard,ElRadioButton} from "element-plus"
import { getTableDataApi,createTableDataApi ,deleteTableDataApi,updateTableDataApi} from "../../api/table/index"
import { Search} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from "vue"
import { flatMap } from "lodash-es"

import Index1 from './index1.vue'
import Index2 from './index2.vue'

const tableData = ref([])
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
const createData = ref({
  username: "",
  password: ""
})
const addData = () =>{
  centerDialogVisible.value = true
}
const dialogVisible = () => {
  console.log('dialogVisible');
  
  debugger
  createTableDataApi({
    username: createData.value.username,
    password: createData.value.password
  }).then((res) => {
    console.log(res)
    // getDataTable()
  })
  centerDialogVisible.value = false
}
// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm("确定删除?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteTableDataApi(row.id).then(()=>{
      getDataTable()
      ElMessage({
        type: "success",
        message: "Delete completed"
      })
    })
    })
}
//编辑
const editData = ref({
  username: ""
})
const handleEdit = (row) =>{
  editData.value = row
  console.log(row)
  centerDialogVisible.value = true
  if(centerDialogVisible.value === false){
    updateTableDataApi({
    row: editData.value
  }).then((res) => {
    console.log(res);
    
  })
  }
}
//查看
const CheckData = ref({
})
const handleCheck = (row) => {
  centerDialogVisible.value = true
  console.log(row)
  CheckData.value = row
  console.log(CheckData.value); 
}
const checkConfirm=()=>{
  centerDialogVisible.value = false
  CheckData.value = ""
}
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
const hangeleReset = (ruleRef) =>{
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
         <el-form-item  >
          <Index1></Index1>
          <Index2></Index2> 
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch()">查询</el-button>
          <el-button type="primary" :icon="Search" @click="hangeleReset(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
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
            <el-button type="primary" @click="handleDetails(scope.row)"> 详情 </el-button>
            <el-button type="primary" @click="handleEdit(scope.row)"> 修改 </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <el-dialog v-model="centerDialogVisible" title="增加" width="500" align-center>
        <el-form
          label-width="auto"
          style="max-width: 600px; margin-top: 10px"
          :model="createData"   
          :inline="true"
        >
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入" v-model="createData.username"
          /></el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入" v-model="createData.password"
          /></el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible"> 确认 </el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 修改 -->
      <el-dialog v-model="centerDialogVisible" title="Warning" width="500" align-center>
        <el-form
          label-width="auto"
          style="max-width: 600px; margin-top: 10px"
          :model="editData"
          ref="ruleFormRef"
          :inline="true"
        >
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入" v-model="editData.username"
          /></el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false"> 确认 </el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 查看 -->
      <el-dialog v-model="centerDialogVisible" title="Warning" width="500" align-center>
        <el-form
          label-width="auto"
          :model="CheckData"
          style="max-width: 600px; margin-top: 10px"
          ref="ruleFormRef"
          :inline="true"
        >
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入" v-model="CheckData.username"
          /></el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入" v-model="CheckData.email"
          /></el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="checkConfirm"> 确认 </el-button>
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
