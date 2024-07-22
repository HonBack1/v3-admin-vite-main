export interface CreateOrUpdateTableRequestData {
  id?: string
  username: string
  password?: string
}

export interface GetTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  /** 查询参数：用户名 */
  username?: string
  /** 查询参数：手机号 */
  phone?: string
  /** 查询参数：邮箱 */
  email?: string
  /** 查询参数：日期 */
  createTime?: {
    startTime?: string
    endTime?: string
  }
}

export interface GetTableData {
  createTime: string
  id: string
  phone: string
  email: string
  roles: string
  status: boolean
  username: string
}

export type GetTableResponseData = ApiResponseData<{
  list: GetTableData[]
  total: number
}>
