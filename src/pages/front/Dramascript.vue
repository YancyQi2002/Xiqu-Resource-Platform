<script setup lang="ts">
import { Toast } from 'flowbite-vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="5rem">
        <Toast type="empty">
          <router-link
            class="nav-link"
            :to="{ name: '京剧' }"
          >
            <a
              class="nav-link active"
              href="/dramascript/jingju"
            >京剧</a>
          </router-link>
        </Toast>
        <Toast type="empty">
          <router-link
            class="nav-link"
            :to="{ name: '北京歌剧' }"
          >
            <a
              class="nav-link active"
              href="/dramascript/peakingopera"
            >北京歌剧</a>
          </router-link>
        </Toast>
      </el-aside>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>

</style>