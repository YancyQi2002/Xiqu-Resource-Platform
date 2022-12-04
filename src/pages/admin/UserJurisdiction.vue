<script setup lang="ts">
import { ElMessage } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import AdminCardBoxVue from '@/components/common/AdminCardBox.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import router from '@/router'
import { getUserlist } from '@/utils/api'

const locale = zhCn

if (localStorage.getItem('user') == null) {
  ElMessage({
    message: 'Error Token',
    type: 'warning',
  })
  router.push({ name: 'Login' })
}

let userInfoJSON

if (JSON.parse((localStorage as any).getItem('user')).token !== '')
  userInfoJSON = JSON.parse((localStorage as any).getItem('user'))

const userInfoJurisdiction = userInfoJSON.jurisdiction

console.log(`当前用户权限：${userInfoJurisdiction}`)

const userlist = ref([])

const search = ref('')

let currentPage = $ref(1)
let pageSize = $ref(5)
const small = ref(false)
const disabled = ref(false)
const total = ref(0)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pageSize = val
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  currentPage = val
}

async function getUserListData() {
  ElMessage({
    message: '正在加载后端数据 。。。',
    duration: 5000,
  })

  const res = await (await fetch(`${getUserlist}?page=${currentPage}&size=${pageSize}`)).json()

  const result = res.data

  for (let i = 0; i < result.length; i++) {
    const id = result[i]._id
    const before = id.substr(0, 4)
    const after = id.substr(20, 4)
    result[i]._id = `${before}****${after}`

    // 判断 jurisdiction 是否为 1
    if (result[i].jurisdiction === '0')
      result[i].jurisdiction = '普通用户'
    else if (result[i].jurisdiction === '1')
      result[i].jurisdiction = '管理员'
    else
      result[i].jurisdiction = '未知'
  }

  total.value = res.total
  userlist.value = result
}

getUserListData()

const dialogFormVisible: any = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  username: '',
  password: '',
  phone: '',
  phonename: '',
  email: '',
})

const handleEdit = (index: number, row: any) => {
  console.log('====== changeUserJurisdiction ======')
  console.log(index, row)
  if (userInfoJurisdiction !== '1') {
    ElMessage({
      message: '您的权限不足，无法对用户进行修改与删除',
      type: 'warning',
      duration: 3000,
    })
  }
  else {
    const changeUserJurisdictionInfo = JSON.stringify(row)
    localStorage.setItem('changeUserJurisdictionInfo', changeUserJurisdictionInfo)
    router.push({ path: '/admin/changeUserJurisdiction' })
  }
}

const handleDelete = (index: number, row: any) => {
  console.log('====== deleteUser ======')
  console.log(index, row)
  if (userInfoJurisdiction !== '1') {
    ElMessage({
      message: '您的权限不足，无法对用户进行修改与删除',
      type: 'warning',
      duration: 3000,
    })
  }
  else {
    const deleteUserInfo = JSON.stringify(row)
    localStorage.setItem('deleteUserInfo', deleteUserInfo)
    router.push({ path: '/admin/deleteUser' })
  }
}
</script>

<template>
  <div class="h-full w-full">
    <AdminCardBoxVue>
      <template #header>
        <h4 class="text-xl font-bold">
          用户权限
        </h4>
      </template>
      <template #default>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="flex overflow-hidden sm:rounded-lg">
                <el-input
                  v-model="search"
                  size="large"
                  placeholder="输入需要查找的用户名"
                >
                  <template #prepend>
                    <el-button size="large">
                      <AppIcon
                        icon="icon-park:search"
                        class="cursor-default"
                      />
                    </el-button>
                  </template>
                </el-input>
                <el-button
                  size="large"
                  class="mx-2"
                  @click="dialogFormVisible = true"
                >
                  添加用户
                </el-button>
              </div>
              <el-dialog
                v-model="dialogFormVisible"
                title="添加条目"
              >
                <el-form :model="form">
                  <el-form-item
                    label="用户名"
                    :label-width="formLabelWidth"
                  >
                    <el-input
                      v-model="form.username"
                      autocomplete="off"
                    />
                  </el-form-item>
                  <el-form-item
                    label="密码"
                    :label-width="formLabelWidth"
                  >
                    <el-input
                      v-model="form.password"
                      type="password"
                      show-password
                      autocomplete="off"
                    />
                  </el-form-item>
                  <el-form-item
                    label="手机号"
                    :label-width="formLabelWidth"
                  >
                    <el-input
                      v-model="form.phone"
                      autocomplete="off"
                    />
                  </el-form-item>
                  <el-form-item
                    label="联系人"
                    :label-width="formLabelWidth"
                  >
                    <el-input
                      v-model="form.phonename"
                      autocomplete="off"
                    />
                  </el-form-item>
                  <el-form-item
                    label="E-mail"
                    :label-width="formLabelWidth"
                  >
                    <el-input
                      v-model="form.email"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button
                      type="primary"
                      @click="dialogFormVisible = false"
                    >添加</el-button>
                  </span>
                </template>
              </el-dialog>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <el-table
            :data="userlist.slice((currentPage - 1) * pageSize, currentPage * pageSize).filter(
              (data: any) =>
                !search || data.username.toLowerCase().includes(search.toLowerCase(),
                ),
            )"
            stripe
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              type="index"
              width="50"
              align="center"
            />
            <el-table-column
              prop="_id"
              label="ID"
              align="center"
            />
            <el-table-column
              prop="username"
              label="用户名"
              align="center"
            />
            <el-table-column
              prop="jurisdiction"
              label="权限"
              align="center"
            />
            <el-table-column
              label="Operations"
              align="center"
            >
              <template #default="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)"
                >
                  Edit
                </el-button>

                <el-button
                  type="danger"
                  size="small"
                  @click="handleDelete(scope.$index, scope.row)"
                >
                  Delete
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </AdminCardBoxVue>

    <!-- Pagination -->
    <div class="mt-4 flex justify-center">
      <el-config-provider :locale="locale">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 10, 15, 20]"
          :small="small"
          :disabled="disabled"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-config-provider>
    </div>
  </div>
</template>

<style scoped>
</style>