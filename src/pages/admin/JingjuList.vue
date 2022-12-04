<script setup lang="ts">
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import AppIcon from '@/components/common/AppIcon.vue'
import BreadcrumbVue from '@/components/common/Breadcrumb.vue'
import router from '@/router'
import { addJingjuItem, deleteJingjuItem, getJingjuList } from '@/utils/api'

const locale = zhCn

const ruleFormRef = ref<FormInstance>()

let userInfoJSON: any

if (localStorage.getItem('user') == null) {
  ElMessage({
    message: 'Error Token',
    type: 'warning',
  })
  router.push({ name: 'Login' })
}

if (JSON.parse((localStorage as any).getItem('user')).token !== '')
  userInfoJSON = JSON.parse((localStorage as any).getItem('user'))

const tabledata = ref([])

const search = ref('')

const filterTag = (value: any, row: { tag: string }) => {
  return row.tag === value
}

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

async function getJingjuListData() {
  ElMessage({
    message: '正在加载后端数据 。。。',
  })

  const res = await (await fetch(`${getJingjuList}?page=${currentPage}&size=${pageSize}`)).json()

  const result = res.data

  for (let i = 0; i < result.length; i++) {
    // 61741c2926f92016bd0695e8 ==> 6174****95e8
    const id = result[i].jingjuId
    // const before = id.substr(0, 4)
    // const back = id.substr(20, 4)
    // result[i].jingjuId = before + "****" + back

    // YYYY 年 MM 月 DD 日
    // YYYY - MM - DD
    // YYYY . MM . DD
    // window.innerWidth 判断窗口中可视区域 (viewpoint) 的宽度 显示不同的格式
    const createYear = result[i].createTime.substr(0, 4)
    const createMonth = result[i].createTime.substr(5, 2)
    const createDay = result[i].createTime.substr(8, 2)
    if (window.innerWidth < 1354 && window.innerWidth > 810)
      result[i].createTime = `${createYear}-${createMonth}-${createDay}`
    else if (window.innerWidth <= 810)
      result[i].createTime = `${createYear}.${createMonth}.${createDay}`
    else
      result[i].createTime = `${createYear}年${createMonth}月${createDay}日`

    const updateYear = result[i].updateTime.substr(0, 4)
    const updateMonth = result[i].updateTime.substr(5, 2)
    const updateDay = result[i].updateTime.substr(8, 2)
    if (window.innerWidth < 1354 && window.innerWidth > 810)
      result[i].updateTime = `${updateYear}-${updateMonth}-${updateDay}`
    else if (window.innerWidth <= 810)
      result[i].updateTime = `${updateYear}.${updateMonth}.${updateDay}`
    else
      result[i].updateTime = `${updateYear}年${updateMonth}月${updateDay}日`
  }

  console.log(result)
  total.value = res.total
  tabledata.value = result
}

onMounted(() => {
  getJingjuListData()
})

const changeJingjuInfo = () => {
  router.push({ name: '修改京剧详细信息' })
}

const dialogFormVisible: any = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  jingjuname: '',
  tag: '',
  faction: '',
  actor: '',
})

const rules = reactive<FormRules>({
  jingjuname: [
    { required: true, message: '请输入京剧剧目', trigger: 'blur' },
  ],
  tag: [
    { required: true, message: '请选择京剧派别', trigger: 'blur' },
  ],
})

const handleAddJingjuItem = async (formEl: FormInstance | any) => {
  // TODO 添加京剧条目 —— 正在寻找新解决方案来取代原方案
  // 新方案正在考虑审核可行性中，暂时关闭此功能
  const formData = toRaw(form)
  console.log(formData)

  /** ************** NEED TO DO ****************/
  /** ********* Coding After This Line ***********/
  ElMessageBox.alert('正在寻找新解决方案来取代原方案，新方案正在考虑审核可行性中，暂时关闭此功能', '提示', {
    confirmButtonText: '知晓',
  })
  /** ********* Coding Before This Line ***********/
}

const handleShow = (index: number, row: any) => {
  console.log(index, row)
  const showInfo = JSON.stringify(row)
  const showInfoId = JSON.parse(showInfo)._id
  const showInfoJingjuId = JSON.parse(showInfo).jingjuId
  const showInfoJingjuname = JSON.parse(showInfo).jingjuname
  const showInfoCreateTime = JSON.parse(showInfo).createTime
  const showInfoUpdateTime = JSON.parse(showInfo).updateTime
  const showInfoContent = JSON.parse(showInfo).content
  localStorage.setItem('showInfoId', showInfoId)
  console.log(showInfo)
  const setShowInfo = {
    _id: showInfoId,
    jingjuId: showInfoJingjuId,
    jingjuname: showInfoJingjuname,
    content: showInfoContent,
    createTime: showInfoCreateTime,
    updateTime: showInfoUpdateTime,
  }
  localStorage.setItem('showJingjuInfo', JSON.stringify(setShowInfo))
  router.push({ name: '查询京剧详细信息' })
}

const handleDelete = (index: number, row: any) => {
  const deleteInfo = JSON.stringify(row)
  const deleteInfoId = JSON.parse(deleteInfo)._id
  ElMessageBox.confirm(
    '您确定要删除此京剧条目吗?',
    'Warning',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(() => {
    if (userInfoJSON.jurisdiction !== '1') {
      ElMessage({
        type: 'warning',
        message: '您没有权限',
      })
      return
    }
    axios({
      method: 'DELETE',
      url: deleteJingjuItem,
      data: {
        _id: deleteInfoId,
      },
      transformRequest: [(data) => {
        let ret = ''
        for (const i in data)
          ret += `${encodeURIComponent(i)}=${encodeURIComponent(data[i])}&`

        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        location.reload()
      }
      else {
        ElMessage({
          type: 'error',
          message: '删除失败',
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: 'Delete canceled',
    })
  })
}
</script>

<template>
  <!-- Breadcrumb -->
  <BreadcrumbVue
    title="京剧列表"
    href="/admin/jingjuList"
  />

  <!-- Table -->
  <div class="relative overflow-x-auto sm:rounded-lg">
    <div class="flex">
      <el-input
        v-model="search"
        size="large"
        placeholder="输入需要查找的京剧剧目/派别/演员"
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
        class="ml-4"
        @click="dialogFormVisible = true"
      >
        <AppIcon
          icon="icon-park:add-one"
          class="mr-4 cursor-default"
        />
        <span>添加京剧</span>
      </el-button>

      <el-button
        size="large"
        class="ml-4"
        @click="changeJingjuInfo"
      >
        <AppIcon
          icon="icon-park:edit-two"
          class="mr-4 cursor-default"
        />
        <span>修改条目</span>
      </el-button>
    </div>
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="添加条目"
  >
    <el-form :model="form">
      <el-form-item
        label="京剧剧目"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.jingjuname"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="京剧派别"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="form.tag"
          placeholder="Please select a tag"
        >
          <el-option
            label="北派"
            value="北派"
          />
          <el-option
            label="南派"
            value="南派"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="行当派别"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.faction"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="演员"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.actor"
          autocomplete="off"
        />
      </el-form-item>
      <el-row class="items-center justify-center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleAddJingjuItem(ruleFormRef)"
        >
          添加
        </el-button>
      </el-row>
    </el-form>
  </el-dialog>
  <br>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <el-table
      :data="tabledata.slice((currentPage - 1) * pageSize, currentPage * pageSize).filter(
        (data: any) =>
          !search || data.jingjuname.toLowerCase().includes(search.toLowerCase()) || data.tag.toLowerCase().includes(search.toLowerCase()) || data.actor.toLowerCase().includes(search.toLowerCase()),
      )"
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        sortable
        width="60"
        align="center"
        label="索引"
      />

      <el-table-column
        prop="jingjuId"
        align="center"
        label="序号"
      />

      <el-table-column
        prop="jingjuname"
        align="center"
        label="剧目"
      />

      <el-table-column
        prop="tag"
        align="center"
        label="派别"
        width="100"
        :filters="[
          { text: '北派', value: '北派' },
          { text: '南派', value: '南派' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.tag === '北派' ? '' : 'success'"
            disable-transitions
          >
            {{ scope.row.tag }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="faction"
        align="center"
        label="行当派别"
      />

      <el-table-column
        prop="actor"
        align="center"
        label="演员"
      />

      <el-table-column
        prop="createTime"
        sortable
        align="center"
        label="创建时间"
      />

      <el-table-column
        prop="updateTime"
        sortable
        align="center"
        label="更新时间"
      />

      <el-table-column
        label="Operations"
        align="center"
      >
        <template #default="scope">
          <div class="flex items-center justify-center">
            <el-button
              size="small"
              type="primary"
              @click="handleShow(scope.$index, scope.row)"
            >
              查看
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- Pagination -->
  <div class="relative mt-4 overflow-x-auto sm:rounded-lg">
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
</template>

<style scoped>
</style>