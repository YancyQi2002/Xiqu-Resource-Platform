<template>
    <el-container>
      <el-aside width="100px">
        <router-link class="nav-link" :to="{ name: '京剧' }">
          <a class="nav-link active" href="/dramascript/jingju">京剧</a>
        </router-link>
        <router-link class="nav-link" :to="{ name: '北京歌剧' }">
          <a class="nav-link active" href="/dramascript/peakingopera">北京歌剧</a>
        </router-link>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>