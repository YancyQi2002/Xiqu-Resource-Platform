<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import HelloWorld from '@/components/HelloWorld.vue'
import useCountStore from '@/store/module/useCountStore'

const countStore = useCountStore()
const refCount = storeToRefs(countStore)
</script>

<template>
  <img
    alt="Vue logo"
    src="@/assets/logo.png"
  >
  count: {{ countStore.num }}
  <button
    class="w-24 rounded-full border-2 bg-cyan-300"
    @click="countStore.increment()"
  >
    +1
  </button>
  refCount: {{ refCount.num }}
  <button
    class="w-24 rounded-full border-2 bg-cyan-300"
    @click="refCount.num.value++"
  >
    +1
  </button>
  <div class="my-2">
    <el-button>
      <app-icon icon="emojione-monotone:ok-hand" />
      Element-plus & iconify is OK!!
    </el-button>
  </div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>