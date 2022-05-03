<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import BreadcrumbVue from '@/components/common/Breadcrumb.vue'
import router from '@/router'
import { getJingjuList } from '@/utils/api'
import { ElMessage } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn

if (localStorage.getItem('user') == null) {
    ElMessage({
        message: 'Error Token',
        type: 'warning',
    })
    router.push({ name: 'Login' })
}

let tabledata = ref([])

const search = ref('')

let filterTag = (value: any, row: { tag: any; }) => {
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

    const res = await (await fetch(getJingjuList + '?page=' + currentPage + '&size=' + pageSize)).json()

    const result = res.data

    for (let i = 0; i < result.length; i++) {

        // 61741c2926f92016bd0695e8 ==> 6174****95e8
        let id = result[i].jingjuId
        const before = id.substr(0, 4)
        const back = id.substr(20, 4)
        result[i].jingjuId = before + "****" + back

        // YYYY 年 MM 月 DD 日
        // YYYY - MM - DD
        // YYYY . MM . DD
        // window.innerWidth 判断窗口中可视区域 (viewpoint) 的宽度 显示不同的格式
        const createYear = result[i].createTime.substr(0, 4)
        const createMonth = result[i].createTime.substr(5, 2)
        const createDay = result[i].createTime.substr(8, 2)
        if (window.innerWidth < 1354 && window.innerWidth > 810) {
            result[i].createTime = createYear + "-" + createMonth + "-" + createDay
        } else if (window.innerWidth <= 810) {
            result[i].createTime = createYear + "." + createMonth + "." + createDay
        } else {
            result[i].createTime = createYear + "年" + createMonth + "月" + createDay + "日"
        }
        const updateYear = result[i].updateTime.substr(0, 4)
        const updateMonth = result[i].updateTime.substr(5, 2)
        const updateDay = result[i].updateTime.substr(8, 2)
        if (window.innerWidth < 1354 && window.innerWidth > 810) {
            result[i].updateTime = updateYear + "-" + updateMonth + "-" + updateDay
        } else if (window.innerWidth <= 810) {
            result[i].updateTime = updateYear + "." + updateMonth + "." + updateDay
        } else {
            result[i].updateTime = updateYear + "年" + updateMonth + "月" + updateDay + "日"
        }
    }

    console.log(result)
    total.value = res.total
    tabledata.value = result
}

onMounted(() => {
    getJingjuListData()
})

const handleShow = (index: number, row: any) => {
    console.log(index, row)
    let showInfo = JSON.stringify(row)
    let showInfoId = JSON.parse(showInfo)._id
    let showInfoJingjuId = JSON.parse(showInfo).jingjuId
    let showInfoJingjuname = JSON.parse(showInfo).jingjuname
    let showInfoCreateTime = JSON.parse(showInfo).createTime
    let showInfoUpdateTime = JSON.parse(showInfo).updateTime
    let showInfoContent = JSON.parse(showInfo).content
    localStorage.setItem('showInfoId', showInfoId)
    console.log(showInfo)
    let setShowInfo = {
        _id: showInfoId,
        jingjuId: showInfoJingjuId,
        jingjuname: showInfoJingjuname,
        content: showInfoContent,
        createTime: showInfoCreateTime,
        updateTime: showInfoUpdateTime
    }
    localStorage.setItem('showJingjuInfo', JSON.stringify(setShowInfo))
    router.push({ name: '查询京剧详细信息' })
}
</script>

<template>
    <!-- Breadcrumb -->
    <BreadcrumbVue title="京剧列表" href="/admin/jingjuList" />

    <!-- Table -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <el-input v-model="search" size="large" placeholder="输入需要查找的京剧剧目/派别/演员">
            <template #prepend>
                <el-button type="text" size="large">
                    <app-icon icon="icon-park:search" class="cursor-default"></app-icon>
                </el-button>
            </template>
        </el-input>
    </div>
    <br />
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <el-table
            :data="tabledata.slice((currentPage - 1) * pageSize, currentPage * pageSize).filter(
            (data: any) =>
                !search || data.jingjuname.toLowerCase().includes(search.toLowerCase()) || data.tag.toLowerCase().includes(search.toLowerCase()) || data.actor.toLowerCase().includes(search.toLowerCase())
            )"
            border
            highlight-current-row
            style="width: 100%"
        >
            <el-table-column type="index" sortable width="60" align="center" label="索引"></el-table-column>

            <el-table-column prop="jingjuId" align="center" label="序号"></el-table-column>

            <el-table-column prop="jingjuname" align="center" label="剧目"></el-table-column>

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
                    <el-tag :type="scope.row.tag === '北派' ? '' : 'success'" disable-transitions>{{ scope.row.tag }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="faction" align="center" label="行当派别"></el-table-column>

            <el-table-column prop="actor" align="center" label="演员"></el-table-column>

            <el-table-column prop="createTime" sortable align="center" label="创建时间"></el-table-column>

            <el-table-column prop="updateTime" sortable align="center" label="更新时间"></el-table-column>

            <el-table-column label="Operations" align="center">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleShow(scope.$index, scope.row)">查看</el-button>
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