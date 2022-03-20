<template>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span class="sr-only">Open main menu</span>
                <app-icon icon="heroicons-solid:menu" v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <app-icon icon="heroicons-solid:x" v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
            </div>
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0 flex items-center">
                <img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
            </div>
            <div class="text-center ml-4 text-2xl text-white font-blod">
                戏曲资源平台
            </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div class="hidden sm:block sm:ml-6">
                <div class="flex space-x-4">
                    <!-- <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a> -->
                    <router-link tag="span" :to="{ path: item.path }" v-for="item in navigation" :key="item.name">
                        <a class="bg-gray-900 text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            {{ item.name }}
                        </a>
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
                    <el-button round @click="toLoginPage">
                        登录
                    </el-button>
                </el-tooltip>
                <el-tooltip
                    class="box-item"
                    effect="light"
                    content="注册用户"
                    placement="bottom"
                >
                    <el-button round @click="toRegisterPage">
                        注册
                    </el-button>
                </el-tooltip>
            </el-button-group>
            </div>
        </div>
        </div>

        <DisclosurePanel class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
            <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
        </div>
        </DisclosurePanel>
    </Disclosure>

    <el-main class="main-wrapper">
        <router-view />
    </el-main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const navigation = [
  { name: '首页', href: '/', path: ''},
  { name: '京剧', href: '/jingju', path: '/jingju'},
  { name: '留言板', href: '/messageboard', path: '/messageboard'},
  { name: '关于', href: '/about', path: '/about'},
]

const router = useRouter()

const toLoginPage = () => {
    router.push({ name: 'Login'})
}

const toRegisterPage = () => {
    router.push({ name: 'Register'})
}
</script>

<style scoped>
.main-wrapper {
    @apply w-full;
    height: calc(100% - 4rem);
}
</style>