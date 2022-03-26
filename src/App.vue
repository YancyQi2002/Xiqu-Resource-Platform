<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

// With the Tauri API npm package:
import { invoke } from '@tauri-apps/api/tauri'
// With the Tauri global script:
// const invoke = (window as any).__TAURI__.invoke

setTimeout(() => {
  // 添加监听函数，监听 DOM 内容加载完成事件
  document.addEventListener('DOMContentLoaded', () => {
    // This will wait for the window to load, but you could
    // run this function on whatever trigger you want
    // DOM 内容加载完成后，通过 invoke 调用 在 Rust 中已经注册的命令
    invoke('close_splashscreen')
  })
}, 5000)
</script>

<template>
  <!-- <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) 2022  Yancy Qi

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.-->
  <router-view />
</template>

<style>
</style>
