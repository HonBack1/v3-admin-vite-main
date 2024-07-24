import { reactive, ref } from "vue"
import { createTableDataApi, updateTableDataApi, deleteTableDataApi, getTableDataApi } from "@/api/table/index"
import { ElMessageBox, ElMessage } from "element-plus"

// export xonst
export const userTableFn = () => {
  const tableData = ref()
  const optionNane = ref()
  const ruleFormRef = ref()
  const formPage = reactive({
    total: 0,
    pageSize: 0,
    currentPage: 1
  })
  const centerDialogVisible = ref(false)

  //页码
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
  }
  const buttonConfirm = () => {
    // console.log(optionNane.value)
    const api = optionNane.value === "add" ? createTableDataApi : updateTableDataApi
    api({
      username: formData.value.username,
      email: formData.value.email
    })
      .then((res) => {
        // formData.value = {}
        console.log("调用api成功")
        getDataTable()
      })
      .finally(() => {
        centerDialogVisible.value = false
      })
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

  //查看
  const handleCheck = (row) => {
    optionNane.value = "check"
    centerDialogVisible.value = true
    formData.value = row
  }
  // 查询
  // 查询条件
  const changData = ref({
    username: "",
    email: ""
  })

  const getDataTable = (page = 1) => {
    console.log(22222)
    getTableDataApi({
      currentPage: page,
      size: 10,
      username: changData.value.username,
      email: changData.value.email
    }).then((res) => {
      formPage.total = res.data.total
      tableData.value = res.data.list
      console.log(res)
    })
  }
  // // 查询按钮
  getDataTable()
  const handleSearch = () => {
    console.log("1111111")
    getDataTable()
  }
  //重置
  const hangeleReset = (ruleRef) => {
    if (!ruleRef) return
    ruleRef.resetFields()
    handleSearch()
  }
  return {
    tableData,
    changData,
    formPage,
    centerDialogVisible,
    ruleFormRef,
    addData,
    handleCheck,
    handleEdit,
    handleDelete,
    currentChange,
    buttonConfirm,
    hangeleReset,
    handleSearch
  }
}
