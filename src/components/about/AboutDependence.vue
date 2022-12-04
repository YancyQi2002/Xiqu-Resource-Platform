<script setup lang="ts">
import type { VxeGridProps } from 'vxe-table'
import { dependencies, devDependencies } from '../../../package.json'

const dloading = reactive({
  loading: false,
})

const gridOptions1 = reactive<VxeGridProps>({
  border: true,
  columnConfig: {
    resizable: true,
  },
  keepSource: true,
  showHeader: true,
  exportConfig: {},
  printConfig: {},
  height: 600,
  toolbarConfig: {
    export: true,
    print: true,
    zoom: true,
    custom: true,
  },
  columns: [
    {
      field: 'col1', width: '25%', title: 'dependenciesPackages', align: 'center',
    },
    {
      field: 'col2', width: '25%', title: 'Version', align: 'center',
    },
    {
      field: 'col3', width: '25%', title: 'devDependenciesPackages', align: 'center',
    },
    {
      field: 'col4', width: '25%', title: 'Version', align: 'center',
    },
  ],
  data: [],
})

const getDependencies = () => {
  dloading.loading = true

  const dependenciesInfoArr: Array<any>[] = []
  const dependenciesVerArr: Array<any>[] = []
  const devDependenciesInfoArr: Array<any>[] = []
  const devDependenciesVerArr: Array<any>[] = []

  let dependenciesLength = 0
  let devDependenciesLength = 0

  for (const i in dependencies) {
    dependenciesInfoArr.push(i as any)
    dependenciesVerArr.push((dependencies as any)[i])
    dependenciesLength++
  }

  console.log(dependenciesInfoArr, dependenciesVerArr)

  for (const j in devDependencies) {
    devDependenciesInfoArr.push(j as any)
    devDependenciesVerArr.push((devDependencies as any)[j])
    devDependenciesLength++
  }

  console.log(devDependenciesInfoArr, devDependenciesVerArr)

  const temp: any[] = []

  if (dependenciesLength > devDependenciesLength) {
    for (const i in dependenciesInfoArr) {
      temp.push({
        col1: dependenciesInfoArr[i],
        col2: dependenciesVerArr[i],
        col3: devDependenciesInfoArr[i],
        col4: devDependenciesVerArr[i],
      })
    }
  }
  else if (devDependenciesLength > dependenciesLength) {
    for (const j in devDependenciesInfoArr) {
      temp.push({
        col1: dependenciesInfoArr[j],
        col2: dependenciesVerArr[j],
        col3: devDependenciesInfoArr[j],
        col4: devDependenciesVerArr[j],
      })
    }
  }

  setTimeout(() => {
    gridOptions1.data = temp
    dloading.loading = false
  }, 5000)
}

getDependencies()
</script>

<template>
  <div>
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="p-4 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          依赖项明细
        </h3>
        <p class="max-w-2xl pt-1 text-sm text-gray-500">
          About the Dependence
        </p>
      </div>
      <hr class="-mt-2">
      <vxe-grid
        class="reverse-table"
        :loading="dloading.loading"
        v-bind="gridOptions1"
      />
    </div>
  </div>
</template>

<style scoped>
</style>