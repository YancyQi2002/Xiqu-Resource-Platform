<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  count: {{ countStore.num }}
  <button class="w-24 bg-cyan-300 border-2 rounded-full" @click="countStore.increment()">+1</button>
  refCount: {{ refCount.num }}
  <button class="w-24 bg-cyan-300 border-2 rounded-full" @click="refCount.num.value++">+1</button>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import HelloWorld from '../components/HelloWorld.vue'
import useCountStore from '../store/module/useCountStore'

const countStore = useCountStore()
const refCount = storeToRefs(countStore)
</script>

<style scoped></style>