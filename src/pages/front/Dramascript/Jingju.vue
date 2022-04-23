<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { getJingjuList } from '@/utils/api'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn

let tabledata = ref([])

const search = ref('')

onMounted(() => {
    loadJingjuList()
})

function filterTag(value: any, row: { tag: any; }) {
    return row.tag === value
}

const currentPage = ref(1)
const pageSize = ref(5)
const small = ref(false)
const disabled = ref(false)
const total  = ref(0)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

async function loadJingjuList() {
    ElMessage({
        message: '正在加载后端数据 。。。',
        duration: 5000
    })

    const res = await (await fetch(getJingjuList + '?page=' + currentPage.value + '&size=' + pageSize.value)).json()

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

        if (result[i].synopsis == "") {
            result[i].synopsis = "暂无简介！"
        }

        if (result[i].audio == "") {
            result[i].audio = "暂无音频资料！"
        }

        if (result[i].video == "") {
            result[i].video = "暂无视频资料！"
        }

        if (result[i].content == "") {
            result[i].content = "暂无唱词 / 剧本！"
        }

    }

    total.value = res.total
    tabledata.value = result
}

const showContent = () => {
    ElMessageBox.alert('请登录查看！', '提示', {
    confirmButtonText: '知晓',
    callback: (action: Action) => {
      ElMessage({
        type: 'warning',
        message: `action: ${action}` + ' ' + '查看剧本、唱词等信息需要登录！',
      })
    },
  })
}
</script>

<template>
    <el-card class="mb-3" shadow="never">
        <el-row class="flex items-center justify-center">
            <div class="p-3">本版块收录 南派、老北派 为主的京剧资源。</div>
            <button
                class="p-2 text-blue-500 border-2 border-sky-500 rounded-md cursor-default"
            >不含剧照等图片资源</button>
        </el-row>
        <el-divider></el-divider>
        <el-row>理由：目前京朝派的剧目越来越少，大量剧目失传，但南派仍然有部分资料保留，且新编戏越来越海派化，而北派新编戏优秀的剧目少之又少，故而以 南派、老北派 为主。</el-row>
    </el-card>

    <el-table
        :data="tabledata.filter(
            (data :any) =>
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
                <el-tag
                    :type="scope.row.tag === '北派' ? '' : 'success'"
                    disable-transitions
                >{{ scope.row.tag }}</el-tag>
            </template>
        </el-table-column>

        <el-table-column prop="actor" align="center" label="演员"></el-table-column>

        <el-table-column prop="createTime" sortable align="center" label="创建时间"></el-table-column>

        <el-table-column prop="updateTime" sortable align="center" label="更新时间"></el-table-column>

        <el-table-column type="expand" width="300">

            <template v-slot:header="scope">
                <el-input v-model="search" size="large" placeholder="输入剧目/派别/演员搜索" clearable />
            </template>

            <template v-slot="props">
                <el-form label-position="left" class="px-4">
                    <el-form-item label="行当派别">
                        <span>{{ props.row.faction }}</span>
                    </el-form-item>
                    <el-form-item label="条目简介">
                        <span>{{ props.row.synopsis }}</span>
                    </el-form-item>
                    <el-form-item label="音频资料">
                        <span v-if="props.row.audio !== '暂无音频资料！'">
                            <audio controls :src="props.row.audio"></audio>
                        </span>
                        <span v-else>{{ props.row.audio }}</span>
                    </el-form-item>
                    <el-form-item label="视频资料">
                        <span v-if="props.row.video !== '暂无视频资料！'" class="w-full">
                            <iframe
                                class="mt-2"
                                width="100%"
                                height="500"
                                :src="props.row.video"
                                scrolling="no"
                                border="0"
                                frameborder="no"
                                framespacing="0"
                                allowfullscreen="true"
                            ></iframe>
                        </span>
                        <span v-else>{{ props.row.video }}</span>
                    </el-form-item>
                    <el-form-item label="剧本&nbsp;/&nbsp;唱词">
                        <span>
                            <a
                                v-if="props.row.content !== '暂无唱词 / 剧本！'"
                                class="btn btn-outline-info mt-2 no-underline"
                                role="button"
                                @click="showContent"
                            >点此查看</a>
                            <span v-else>暂无唱词 / 剧本！</span>
                        </span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
    </el-table>

    <!-- Pagination -->
    <div class="relative mt-4 overflow-x-auto sm:rounded-lg">
        <el-config-provider :locale="locale">
            <el-pagination
                v-model:currentPage="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[5, 10, 15, 20]"
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