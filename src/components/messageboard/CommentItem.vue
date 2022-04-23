<script setup lang="ts">
    defineProps([
        "user",
        "avatar",
        "time",
        "content"
    ])
</script>

<template>
    <div class="flex">
        <!-- 即使在 public 文件夹下，也需要使用 / 绝对路径引用，省略 Public -->
        <!-- <img src="/images/loginLogo.png" class="mr-4 w-12 h-12 rounded-full" /> -->

        <img :src="avatar" class="mr-4 w-12 h-12 rounded-full" />

        <div>
            <p>{{ user }}</p>
            <p class="text-sm text-gray-600">{{ time }}</p>
        </div>

        <!-- 菜单右对齐 -->
        <span class="ml-auto">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                />
            </svg>
        </span>
    </div>

    <p class="-mt-2 py-2 pl-16 text-gray-600">
        {{ content }}
    </p>
</template>

<style scoped>
</style>