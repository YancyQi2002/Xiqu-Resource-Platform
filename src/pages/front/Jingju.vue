<template>
    <el-card class="mb-3" shadow="never">
        <el-row class="flex items-center justify-center">
            <div class="p-3">本版块收录 南派、老北派 为主的京剧资源。</div>
            <button class="p-2 text-blue-500 border-2 border-sky-500 rounded-md cursor-default">不含剧照等图片资源</button>
        </el-row>
        <el-divider></el-divider>
        <el-row>理由：目前京朝派的剧目越来越少，大量剧目失传，但南派仍然有部分资料保留，且新编戏越来越海派化，而北派新编戏优秀的剧目少之又少，故而以 南派、老北派 为主。</el-row>
    </el-card>

    <el-table
        :data="tabledata.filter(
            (data) =>
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
                    :type="scope.row.tag === '北派' ? 'primary' : 'success'"
                    disable-transitions
                >{{ scope.row.tag }}</el-tag>
            </template>
        </el-table-column>

        <el-table-column prop="actor" align="center" label="演员"></el-table-column>

        <el-table-column prop="createTime" sortable align="center" label="创建时间"></el-table-column>

        <el-table-column prop="updateTime" sortable align="center" label="更新时间"></el-table-column>

        <el-table-column type="expand" width="300">
            <!-- element-plus 1.1.0-beta.24 生效 -->
            <!-- <template v-slot:header="scope">
        <el-input
          v-model="search"
          size="medium"
          placeholder="输入剧目/派别/演员搜索"
          prefix-icon="el-icon-search"  
          clearable
        />
            </template>-->
            <!-- element-plus 1.2.0-beta.3 生效 -->

            <template v-slot:header="scope">
                <el-input
                    v-model="search"
                    size="medium"
                    placeholder="输入剧目/派别/演员搜索"
                    clearable
                />
            </template>

            <template v-slot="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="行当派别">
                        <span>{{ props.row.faction }}</span>
                    </el-form-item>
                    <el-form-item label="条目简介">
                        <span>{{ props.row.synopsis }}</span>
                    </el-form-item>
                    <el-form-item label="音频资料">
                        <!-- <span v-if="props.row.audio !== "暂无音频资料！"">
                            <audio controls :src="props.row.audio"></audio>
                        </span> -->
                        <!-- <span v-else>{{ props.row.audio }}</span> -->
                    </el-form-item>
                    <el-form-item label="视频资料">
                        <!-- <span v-if="props.row.video !== "暂无视频资料！"">
                            <iframe
                                class="mt-2"
                                width="90%"
                                height="500"
                                :src="props.row.video"
                                scrolling="no"
                                border="0"
                                frameborder="no"
                                framespacing="0"
                                allowfullscreen="true"
                            ></iframe>
                        </span>
                        <span v-else>{{ props.row.video }}</span> -->
                    </el-form-item>
                    <el-form-item label="剧本&nbsp;/&nbsp;唱词">
                        <span>
                            <a
                                class="btn btn-outline-info mt-2 no-underline"
                                role="button"
                                :href="props.row.content"
                                target="_blank"
                            >点此查看</a>
                        </span>
                    </el-form-item>
                    <!-- <el-form-item label="编辑操作">
            <span>
              <a
                class="btn btn-outline-info mt-2 mr-2 no-underline"
                role="button"
                target="_blank"
              >编辑条目简介</a>
              <a
                class="btn btn-outline-info mt-2 mr-2 no-underline"
                role="button"
                target="_blank"
              >编辑音频资料</a>
              <a
                class="btn btn-outline-info mt-2 mr-2 no-underline"
                role="button"
                target="_blank"
              >编辑视频资料</a>
              <a
                class="btn btn-outline-info mt-2 mr-2 no-underline"
                role="button"
                target="_blank"
              >编辑剧本 / 唱词</a>
            </span>
          </el-form-item>
          <el-form-item label="删除操作">
            <span>
              <a class="btn btn-secondary mt-2 no-underline disabled disabled:text-gray-300 cursor-not-allowed" role="button" target="_blank">删除条目</a>
            </span>
                    </el-form-item>-->
                </el-form>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { inject, ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const axios: any = inject("axios")

let tabledata = reactive([])

const search = ref('')

onMounted(() => {
    loadJingjuList()
})

function filterTag(value: any, row: { tag: any; }) {
    return row.tag === value
}

function loadJingjuList() {
    ElMessage({
        message: '正在加载后端数据 。。。',
        duration: 5000
    })

    setTimeout(() => {

        axios.get('/api/dramascript/jingjulist').then((res: { data: any; }) => {

            // console.log(res.data)
            let data = res.data
            console.log(data)

            for (let i = 0; i < data.length; i++) {

                // 61741c2926f92016bd0695e8 ==> 6174****95e8
                let id = data[i].jingjuId
                const before = id.substr(0, 4)
                const back = id.substr(20, 4)
                data[i].jingjuId = before + "****" + back

                // YYYY 年 MM 月 DD 日
                // YYYY - MM - DD
                // YYYY . MM . DD
                // window.innerWidth 判断窗口中可视区域 (viewpoint) 的宽度 显示不同的格式
                const createYear = data[i].createTime.substr(0, 4)
                const createMonth = data[i].createTime.substr(5, 2)
                const createDay = data[i].createTime.substr(8, 2)
                if (window.innerWidth < 1354 && window.innerWidth > 810) {
                    data[i].createTime = createYear + "-" + createMonth + "-" + createDay
                } else if (window.innerWidth <= 810) {
                    data[i].createTime = createYear + "." + createMonth + "." + createDay
                } else {
                    data[i].createTime = createYear + "年" + createMonth + "月" + createDay + "日"
                }
                const updateYear = data[i].updateTime.substr(0, 4)
                const updateMonth = data[i].updateTime.substr(5, 2)
                const updateDay = data[i].updateTime.substr(8, 2)
                if (window.innerWidth < 1354 && window.innerWidth > 810) {
                    data[i].updateTime = updateYear + "-" + updateMonth + "-" + updateDay
                } else if (window.innerWidth <= 810) {
                    data[i].updateTime = updateYear + "." + updateMonth + "." + updateDay
                } else {
                    data[i].updateTime = updateYear + "年" + updateMonth + "月" + updateDay + "日"
                }

                if (data[i].synopsis == "") {
                    data[i].synopsis = "暂无简介！"
                }

                if (data[i].audio == "") {
                    data[i].audio = "暂无音频资料！"
                }

                if (data[i].video == "") {
                    data[i].video = "暂无视频资料！"
                }

                if (data[i].content == "") {
                    data[i].content = "data:application/pdf;base64,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"
                }

                try {
                    tabledata.push(data[i])
                } catch (error) {
                    console.log(error)
                }

            }

            // console.log(tabledata)
        }).catch((error: any) => {
            console.log(error)
        })
    }, 5000)
}
</script>

<style scoped>
</style>