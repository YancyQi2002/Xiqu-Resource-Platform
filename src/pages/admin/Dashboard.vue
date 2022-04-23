<script setup lang="ts">
</script>

<template>
    <el-row class="flex items-center">
        <a
            class="block p-6 max-w-md bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome</h5>
            <p
                class="font-normal text-gray-700 dark:text-gray-400"
            >欢迎访问戏曲资源平台本平台资料录入始于 2022 年。希望可以丰富整合互联网上的戏曲资料。</p>
        </a>

        <a class="block m-6 max-w-md rounded-lg">
            <img class="rounded-t-lg" src="@/assets/logo.png" width="300" />
        </a>
    </el-row>

    <br />

    <div class="flex items-center justify-between">
        <div class="card text-center">
            <img src="@/assets/homeLogoLeft.jpg" width="300" height="300" />
        </div>

        <div class="card text-center">
            <img src="@/assets/homeLogoCenter.jpg" width="300" height="300" />
        </div>

        <div class="card text-center">
            <img src="@/assets/homeLogoRight.jpg" width="300" height="300" />
        </div>
    </div>

    <br />

    <div class="card text-center">
        <div class="card-body home-center">
            <h5 class="card-title text-xl font-bold">精彩推荐</h5>
            <div class="aspect-ratio">
                <iframe
                    src="//player.bilibili.com/player.html?aid=35275860&bvid=BV16b411w7fx&cid=61819819&page=1&high_quality=1"
                    scrolling="no"
                    border="0"
                    frameborder="no"
                    framespacing="0"
                    allowfullscreen="true"
                > </iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
.aspect-ratio {
    @apply relative w-full h-0;
    padding-bottom: 50%;
}

.aspect-ratio iframe {
    @apply absolute w-full h-full left-0 top-0;
}
</style>