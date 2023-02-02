<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import AppIcon from '@/components/common/AppIcon.vue'
import { clearlocalStorage } from '@/utils/clearlocalStorage'

const router = useRouter()

let userInfoJSON

if (localStorage.getItem('user') == null) {
  ElMessage({
    message: 'Error Token',
    type: 'warning',
  })
  router.push({ name: 'Login' })
}

let userJurisdiction: string

if (JSON.parse((localStorage as any).getItem('user')).token !== '') {
  userInfoJSON = JSON.parse((localStorage as any).getItem('user'))
  if (userInfoJSON.jurisdiction === '1')
    userJurisdiction = '管理员'
  else if (userInfoJSON.jurisdiction === '0')
    userJurisdiction = '普通用户'
  else
    userJurisdiction = '未知用户'
}

const asideWidth = ref('210px')

const handleAsideChange = () => {
  asideWidth.value = asideWidth.value === '210px' ? '60px' : '210px'
}

const collapse = computed(() => {
  return asideWidth.value !== '210px'
})

const handleMenuChange = (index: string) => {
  console.log(index)
  switch (index) {
    case '1':
      router.push({ name: '控制面板' })
      break
    case '2-1':
      router.push({ name: '用户列表' })
      break
    case '2-2':
      router.push({ name: '用户权限' })
      break
    case '3-1':
      router.push({ name: '京剧唱腔板式' })
      break
    case '3-2':
      router.push({ name: '京剧列表' })
      break
    case '4':
      router.push({ name: '关于后台' })
      break
    default:
      break
  }
}

const userAvatar = ref('')

if (userInfoJSON.avatar === '')
  userAvatar.value = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
else
  userAvatar.value = userInfoJSON.avatar

// 修改密码
const changeUserPassword = () => {
  router.push({ name: '修改密码' })
}

// 退出登录
const isOpen = ref(false)

const closeModal = () => {
  isOpen.value = false
}

const openModal = () => {
  isOpen.value = true
}

const logout = () => {
  closeModal()
  clearlocalStorage()
  router.push({ name: 'Login' })
}

const toDeleteUserPage = () => {
  router.push({ name: '删除用户' })
}

// 全屏
const { isFullscreen, toggle } = useFullscreen()
</script>

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
            <div
              v-if="asideWidth === '210px'"
              class="text"
            >
              后台管理
            </div>
            <div v-else>
              <AppIcon
                icon="healthicons:ui-menu-grid-outline"
                class="py-1 text-4xl"
              />
            </div>
          </div>
          <el-menu-item index="1">
            <el-icon>
              <AppIcon icon="ep:menu" />
            </el-icon>
            <span>控制面板</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <AppIcon icon="ep:user-filled" />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="2-1">
              <span>用户列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <span>用户权限</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <AppIcon icon="ep:notebook" />
              </el-icon>
              <span>戏曲管理</span>
            </template>
            <el-menu-item index="3-1">
              <span>京剧唱腔板式</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <span>京剧列表</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="4">
            <el-icon>
              <AppIcon icon="entypo:info" />
            </el-icon>
            <span>关于后台</span>
          </el-menu-item>
        </el-menu>
      </div>
      <el-container class="right-wrapper">
        <el-header class="right-header">
          <div class="header-left">
            <div
              v-if="asideWidth === '210px'"
              @click="handleAsideChange"
            >
              <AppIcon
                icon="icon-park:menu-unfold-one"
                class="cursor-pointer text-4xl"
              />
            </div>
            <div
              v-else
              @click="handleAsideChange"
            >
              <AppIcon
                icon="icon-park:menu-fold-one"
                class="cursor-pointer text-4xl"
              />
            </div>
            <div class="site-title">
              戏曲资源平台
            </div>
          </div>
          <div class="header-right">
            <div
              class="mr-4 text-2xl"
              style="font-family: YSXK;"
            >
              当前用户权限：{{ userJurisdiction }}
            </div>
            <div
              v-if="isFullscreen === false"
              @click="toggle"
            >
              <AppIcon
                icon="icon-park:full-screen-one"
                class="mr-3 cursor-pointer text-4xl"
              />
            </div>
            <div
              v-else
              @click="toggle"
            >
              <AppIcon
                icon="icon-park:full-screen-play"
                class="mr-3 cursor-pointer text-4xl"
              />
            </div>
            <div class="avatar cursor-pointer">
              <el-dropdown
                trigger="click"
                size="small"
              >
                <span class="el-dropdown-link">
                  <img
                    class="h-10 w-10 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
                    :src="userAvatar"
                  >
                </span>
                <template #dropdown>
                  <el-dropdown-menu class="text-center">
                    <el-dropdown-item @click="changeUserPassword">
                      修改密码
                    </el-dropdown-item>
                    <el-dropdown-item @click="openModal">
                      退出登录
                    </el-dropdown-item>
                    <el-dropdown-item
                      divided
                      @click="toDeleteUserPage"
                    >
                      删除账号
                    </el-dropdown-item>
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
  <TransitionRoot
    appear
    :show="isOpen"
    as="template"
  >
    <Dialog
      as="div"
      @close="closeModal"
    >
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span
            class="inline-block h-screen align-middle"
            aria-hidden="true"
          >&#8203;</span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="my-8 inline-block w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                提示
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  您确定退出吗？
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="logout"
                >
                  确定退出
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

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
  @apply bg-gray-300;
}
</style>