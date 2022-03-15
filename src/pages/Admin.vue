<template>
  <div class="common-layout">
    <el-container class="wrapper">
      <div class="left-aside aside-menus">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo h-full transition-all"
          :collapse="collapse"
          @select="handleMenuChange"
        >
          <div class="aside-logo">
            <div class="text" v-if="asideWidth == '210px'">后台管理</div>
            <div v-else>
              <app-icon
                icon="healthicons:ui-menu-grid-outline"
                class="py-1 text-4xl"
              />
            </div>
          </div>
          <el-menu-item index="1">
            <el-icon><app-icon icon="ep:menu" /></el-icon>
            <span>控制面板</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><app-icon icon="ep:user-filled" /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="2-1">
              <span>用户列表</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3">
            <el-icon><app-icon icon="entypo:info" /></el-icon>
            <span>关于后台</span>
          </el-menu-item>
        </el-menu>
      </div>
      <el-container class="right-wrapper">
        <el-header class="right-header">
          <div class="header-left">
            <div @click="handleAsideChange" v-if="asideWidth == '210px'">
              <app-icon
                icon="icon-park:menu-unfold-one"
                class="text-4xl cursor-pointer"
              />
            </div>
            <div @click="handleAsideChange" v-else>
              <app-icon
                icon="icon-park:menu-fold-one"
                class="text-4xl cursor-pointer"
              />
            </div>
            <div class="site-title">
              戏曲资源平台
            </div>
          </div>
          <div class="header-right">
            <div class="avatar cursor-pointer">
              <el-dropdown trigger="click" size="small">
                <span class="el-dropdown-link">
                  <el-avatar
                    alt="Avatar"
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  ></el-avatar>
                </span>
                <template #dropdown>
                  <el-dropdown-menu class="text-center">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import routes from '@/router/module/admin'
import { useRouter } from 'vue-router'

const asideWidth = ref('210px')

const handleAsideChange = () => {
  asideWidth.value = asideWidth.value === '210px' ? '60px' : '210px'
}

const collapse = computed(() => {
  return asideWidth.value !== '210px'
})

const router = useRouter()

const handleMenuChange = (index :string) => {
  console.log(index)
  switch (index) {
    case '1':
      router.push({ name: '控制面板' })
      break;
    case '2-1':
      router.push({ name: '用户列表' })
      break;
    case '3':
      router.push({ name: '关于后台' })
      break;
    default:
      break;
  }
}
</script>

<style scoped>
.common-layout,
.wrapper {
  @apply w-full h-full;
}

.left-aside {
  @apply flex flex-col h-full bg-gray-100;
}

.aside-logo {
  @apply flex items-center justify-center text-center mx-5 my-2 h-10 select-none;
}

.aside-logo .text {
  @apply text-center px-5 py-2 text-base text-white font-bold bg-gray-700 rounded;
}

.aside-menus {
  @apply overflow-x-hidden overflow-y-auto;
}

.right-wrapper {
  @apply flex-1;
}

.right-header {
  @apply flex items-center justify-between bg-indigo-100;
}

.header-left,
.header-right {
  @apply flex items-center justify-center;
}

.site-title {
  @apply ml-3 font-bold text-lg tracking-wide select-none;
}

.right-main {
  @apply bg-green-300;
}
</style>
