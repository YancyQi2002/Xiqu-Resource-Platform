<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router';

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
    jingjuname = (document as any).getElementById("jingjuname").value
    console.log(jingjuname)
    if (jingjuname == '') {
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
        duration: 5000
    })

    axios({
        url: '/api/dramascript/jingjuinfo',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            jingjuname: jingjuname
        },
        transformRequest: [(data) => {
            let ret = ""
            for (let i in data) {
                ret += encodeURIComponent(i) + "=" + encodeURIComponent(data[i]) + "&"
            }
            return ret
        }],
    }).then(res => {
        let result = res.data
        console.log(result.data)
        checkData = result.data
    })
}

const refresh = () => {
    let { ctx: that } = getCurrentInstance() as any
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
            trigger: 'blur'
        }
    ],
    tag: [
        {
            required: true,
            message: '请选择派别',
            trigger: 'blur'
        }
    ],
    faction: [
        {
            required: true,
            message: '请输入行当派别',
            trigger: 'blur'
        }
    ],
})

const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(toRaw(form))
            // 判断对象里的值是否为空
            for (let key in toRaw(form)) {
                if ((toRaw(form) as any)[key] == '') {
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
                    'Content-Type': 'application/x-www-form-urlencoded'
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
                    let ret = ""
                    for (let i in data) {
                        ret += encodeURIComponent(i) + "=" + encodeURIComponent(data[i]) + "&"
                    }
                    return ret
                }],
            }).then(res => {
                let result = res.data
                console.log(result.data)
                ElMessage({
                    message: '修改成功',
                    type: 'success'
                })
                console.log('changeJingjuInfo!')
            })
        } else {
            console.log('error change!', fields)
        }
    })
}

const back = () => {
    router.push({ name: '京剧列表' })
}
</script>
<template>
    <div class="flex items-center justify-center pt-12 px-4 pb-4 sm:px-6 lg:px-8 bg-gray-100">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 select-none">修改京剧条目</h2>
            </div>

            <div class="flex items-center justify-center mt-4">
                <input type="text" id="jingjuname"
                    class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="输入要修改的剧目" required>
                <button type="button"
                    class="m-2 w-24 leading-9 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    @click="check">查询</button>
            </div>
        </div>
    </div>

    <el-table :data="checkData" stripe highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
        <el-table-column prop="jingjuId" label="序号" width="180" align="center" />
        <el-table-column prop="jingjuname" label="剧目" width="180" align="center" />
        <el-table-column prop="tag" label="京剧派别" align="center" />
        <el-table-column prop="faction" label="行当派别" align="center" />
        <el-table-column prop="actor" label="演员" align="center" />
    </el-table>

    <div class="flex items-center justify-center text-center pt-12 px-4 pb-4 sm:px-6 lg:px-8 bg-gray-100">
        当前选中条目：{{ currentRowData.jingjuId }} {{ currentRowData.jingjuname }}
    </div>

    <div class="flex items-center justify-center pt-10 px-2 pb-4 sm:px-4 lg:px-6 bg-gray-100"
        v-if="currentRowData.jingjuname !== ''">
        <div class="max-w-md w-full space-y-4">
            <el-form :model="form" ref="ruleFormRef" label-width="120px" :rules="rules" class="demo-ruleForm">
                <el-form-item label="演员">
                    <el-input v-model="form.actor" :placeholder="currentRowData.actor"></el-input>
                </el-form-item>
                <el-form-item label="京剧派别">
                    <el-select v-model="form.tag" :placeholder="currentRowData.tag">
                        <el-option label="北派" value="北派" />
                        <el-option label="南派" value="南派" />
                    </el-select>
                </el-form-item>
                <el-form-item label="行当派别">
                    <el-input v-model="form.faction" :placeholder="currentRowData.faction"></el-input>
                </el-form-item>
                <el-form-item label="条目简介">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="form.synopsis"
                        :placeholder="currentRowData.synopsis"></el-input>
                </el-form-item>
                <el-form-item label="视频资料">
                    <el-input v-model="form.video" :placeholder="currentRowData.video"></el-input>
                </el-form-item>
                <el-form-item label="唱词 / 剧本">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="form.content"
                        :placeholder="currentRowData.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(ruleFormRef)">修改</el-button>
                    <el-button @click="back">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
</style>