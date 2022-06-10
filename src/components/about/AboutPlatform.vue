<script setup lang="ts">
// @ts-nocheck
import { getTauriVersion } from '@tauri-apps/api/app'
import { os } from '@tauri-apps/api'

let tauriVersion = $ref('')
let platform = $ref('')
let arch = $ref('')
let osVersion = $ref('')

const getTauriInfo = async (): Promise<void> => {
	tauriVersion = await getTauriVersion()
	platform = await os.platform()
	arch = await os.arch()
	osVersion = await os.version()
}

getTauriInfo()
</script>

<template>
	<div class="bg-white shadow overflow-hidden sm:rounded-lg">
		<div class="px-4 py-4 sm:px-6">
			<h3 class="text-lg leading-6 font-medium text-gray-900">关于平台</h3>
			<p class="mt-1 mb-0 max-w-2xl text-sm text-gray-500">About the platform</p>
		</div>
		<div class="border-t border-gray-200">
			<dl>
				<div class="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-500">Tauri version:</dt>
					<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ tauriVersion }}</dd>
				</div>
				<div class="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-500">OS:</dt>
					<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ platform }} {{ arch }} {{ osVersion
					}}</dd>
				</div>

				<div class="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-500">Why was this platform created?</dt>
					<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
						由于计算机技术的蓬勃发展，网络早已变成人类生活必要的组成部分。一直以来，人们在管理戏曲资源时一般都是采用的较为传统的模式，这种传统模式通常会存在着或多或少的缺点。虽然也有一些戏曲资源网站，不过太过分散，这对于使用者查找、开发者更新和维护数据都带来了不少的困难。而通过新兴信息技术对各类文化戏曲资源实施集中管理，则有着与其它管理所无法相比的优势。例如:查询方便、存贮容量大、及时更新优化等。上述特性能够明显提升资源管理的效能。本平台是一个基于最新的
						Web 框架技术开发的功能较为完备的戏曲资源平台。</dd>
				</div>
				<div class="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-500">What are the main techniques used?</dt>
					<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Vite 2 + Vue 3 + Pinia 2 + Vue-Router 4
						+ TailwindCSS 3 + Element-Plus + HeadlessUI + Tauri</dd>
				</div>
				<div class="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-500">What licence does the platform use?</dt>
					<dd class="flex items-start justify-start mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
						<div class="py-2 pr-2">AGPL-3.0-or-later</div>
						<img src="https://www.gnu.org/graphics/agplv3-with-text-162x68.png">
						<div class="py-2 pl-2">（ Current Version ）</div>
					</dd>
				</div>
			</dl>
		</div>
	</div>
</template>

<style scoped>
</style>
