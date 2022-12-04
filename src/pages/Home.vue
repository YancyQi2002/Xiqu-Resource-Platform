<script setup lang="ts">
const navigation = [
  { name: '首页', href: '/', path: '' },
  { name: '资源列表', href: '/dramascript', path: '/dramascript' },
  { name: '留言板', href: '/messageboard', path: '/messageboard' },
  { name: '关于', href: '/about', path: '/about' },
]

const router = useRouter()

const toLoginPage = () => {
  router.push({ name: 'Login' })
}

const toRegisterPage = () => {
  router.push({ name: 'Register' })
}
</script>

<template>
  <Disclosure
    v-slot="{ open }"
    as="nav"
    class="bg-gray-800"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <app-icon
              v-if="!open"
              icon="heroicons-solid:menu"
              class="block h-6 w-6"
              aria-hidden="true"
            />
            <app-icon
              v-else
              icon="heroicons-solid:x"
              class="block h-6 w-6"
              aria-hidden="true"
            />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <img
              class="block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            >
          </div>
          <div class="font-blod ml-4 text-center text-2xl text-white">
            戏曲资源平台
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <!-- <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a> -->
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="{ path: item.path }"
                class="no-underline"
              >
                <span>
                  <a class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white no-underline hover:bg-gray-700 hover:text-white">
                    {{ item.name }}
                  </a>
                </span>
              </router-link>
            </div>
          </div>
          <el-button-group class="ml-4">
            <el-tooltip
              class="box-item"
              effect="light"
              content="登录后台"
              placement="bottom"
            >
              <el-button
                round
                @click="toLoginPage"
              >
                登录
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="light"
              content="注册用户"
              placement="bottom"
            >
              <el-button
                round
                @click="toRegisterPage"
              >
                注册
              </el-button>
            </el-tooltip>
          </el-button-group>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          aria-current="page"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>

  <el-main class="main-wrapper">
    <router-view />
  </el-main>
</template>

<style scoped>
.main-wrapper {
    @apply w-full;
    height: calc(100% - 4rem);
}
</style>