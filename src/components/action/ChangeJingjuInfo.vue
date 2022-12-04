<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router'

let checkData: any = $ref([])

let currentRow = $ref()

let currentRowData: any = $ref({
  jingjuname: '',
  jingjuid: '',
})

let jingjuname: string

const check = () => {
  currentRowData = {
    jingjuname: '',
    jingjuid: '',
  }
  jingjuname = (document as any).getElementById('jingjuname').value
  console.log(jingjuname)
  if (jingjuname === '') {
    currentRowData = {
      jingjuname: '',
      jingjuid: '',
    }
    ElMessage({
      message: '请输入需要修改的剧目',
      type: 'error',
    })
    return
  }
  ElMessage({
    message: '正在查询数据',
    type: 'success',
    duration: 5000,
  })

  axios({
    url: '/api/dramascript/jingjuinfo',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      jingjuname,
    },
    transformRequest: [(data) => {
      let ret = ''
      for (const i in data)
        ret += `${encodeURIComponent(i)}=${encodeURIComponent(data[i])}&`

      return ret
    }],
  }).then((res) => {
    const result = res.data
    console.log(result.data)
    checkData = result.data
  })
}

const refresh = () => {
  const { ctx: that } = getCurrentInstance() as any
  that.$forceUpdate()
}

const handleCurrentChange = (val: any) => {
  currentRow = val
  currentRowData = toRaw(currentRow)
}

const form = reactive({
  actor: '',
  tag: '',
  faction: '',
  synopsis: '',
  video: '',
  content: '',
})

const formEl = ref<HTMLFormElement | null>(null)
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  actor: [
    {
      required: true,
      message: '请输入演员',
      trigger: 'blur',
    },
  ],
  tag: [
    {
      required: true,
      message: '请选择派别',
      trigger: 'blur',
    },
  ],
  faction: [
    {
      required: true,
      message: '请输入行当派别',
      trigger: 'blur',
    },
  ],
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(toRaw(form))
      // 判断对象里的值是否为空
      for (const key in toRaw(form)) {
        if ((toRaw(form) as any)[key] === '') {
          ElMessage({
            message: '请输入完整的信息',
            type: 'error',
          })
          return
        }
      }

      axios({
        url: '/api/dramascript/changejingjuinfo',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          jingjuId: currentRowData.jingjuid,
          jingjuname: (toRaw(form) as any).jingjuname,
          actor: (toRaw(form) as any).actor,
          tag: (toRaw(form) as any).tag,
          faction: (toRaw(form) as any).faction,
          synopsis: (toRaw(form) as any).synopsis,
          video: (toRaw(form) as any).video,
          content: (toRaw(form) as any).content,
        },
        transformRequest: [(data) => {
          let ret = ''
          for (const i in data)
            ret += `${encodeURIComponent(i)}=${encodeURIComponent(data[i])}&`

          return ret
        }],
      }).then((res) => {
        const result = res.data
        console.log(result.data)
        ElMessage({
          message: '修改成功',
          type: 'success',
        })
        console.log('changeJingjuInfo!')
      })
    }
    else {
      console.log('error change!', fields)
    }
  })
}

const back = () => {
  router.push({ name: '京剧列表' })
}
</script>

<template>
  <div class="flex items-center justify-center bg-gray-100 px-4 pt-12 pb-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        >
        <h2 class="mt-6 select-none text-center text-3xl font-extrabold text-gray-900">
          修改京剧条目
        </h2>
      </div>

      <div class="mt-4 flex items-center justify-center">
        <input
          id="jingjuname"
          type="text"
          class="mr-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="输入要修改的剧目"
          required
        >
        <button
          type="button"
          class="m-2 mr-2 mb-2 w-24 rounded-full border border-gray-300 bg-white text-sm font-medium leading-9 text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          @click="check"
        >
          查询
        </button>
      </div>
    </div>
  </div>

  <el-table
    :data="checkData"
    stripe
    highlight-current-row
    style="width: 100%"
    @current-change="handleCurrentChange"
  >
    <el-table-column
      prop="jingjuId"
      label="序号"
      width="180"
      align="center"
    />
    <el-table-column
      prop="jingjuname"
      label="剧目"
      width="180"
      align="center"
    />
    <el-table-column
      prop="tag"
      label="京剧派别"
      align="center"
    />
    <el-table-column
      prop="faction"
      label="行当派别"
      align="center"
    />
    <el-table-column
      prop="actor"
      label="演员"
      align="center"
    />
  </el-table>

  <div class="flex items-center justify-center bg-gray-100 px-4 pt-12 pb-4 text-center sm:px-6 lg:px-8">
    当前选中条目：{{ currentRowData.jingjuId }} {{ currentRowData.jingjuname }}
  </div>

  <div
    v-if="currentRowData.jingjuname !== ''"
    class="flex items-center justify-center bg-gray-100 px-2 pt-10 pb-4 sm:px-4 lg:px-6"
  >
    <div class="w-full max-w-md space-y-4">
      <el-form
        ref="ruleFormRef"
        :model="form"
        label-width="120px"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item label="演员">
          <el-input
            v-model="form.actor"
            :placeholder="currentRowData.actor"
          />
        </el-form-item>
        <el-form-item label="京剧派别">
          <el-select
            v-model="form.tag"
            :placeholder="currentRowData.tag"
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
        <el-form-item label="行当派别">
          <el-input
            v-model="form.faction"
            :placeholder="currentRowData.faction"
          />
        </el-form-item>
        <el-form-item label="条目简介">
          <el-input
            v-model="form.synopsis"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :placeholder="currentRowData.synopsis"
          />
        </el-form-item>
        <el-form-item label="视频资料">
          <el-input
            v-model="form.video"
            :placeholder="currentRowData.video"
          />
        </el-form-item>
        <el-form-item label="唱词 / 剧本">
          <el-input
            v-model="form.content"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :placeholder="currentRowData.content"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit(ruleFormRef)"
          >
            修改
          </el-button>
          <el-button @click="back">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
</style>