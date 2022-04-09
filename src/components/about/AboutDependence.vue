<template>
    <div>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-4 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">依赖项明细</h3>
                <p class="pt-1 max-w-2xl text-sm text-gray-500">About the Dependence</p>
            </div>
            <hr />
            <vxe-grid class="reverse-table" :loading="dloading.loading" v-bind="gridOptions1"></vxe-grid>
        </div>
    </div>
</template>

<script setup lang="ts">
import config from '../../../package.json'
import { VxeGridProps } from 'vxe-table'

const xToolbar :any = ref({})

const dloading = reactive({
    loading: false
})

const gridOptions1 = reactive<VxeGridProps>({
    border: true,
    // resizable: true,
    columnConfig: {
        resizable: true
    },
    keepSource: true,
    showHeader: true,
    exportConfig: {},
    printConfig: {},
    height: 600,
    toolbarConfig: {
        print: {
            icon: 'vxe-icon--print'
        },
        export: {
            icon: 'vxe-icon--download'
        }
    },
    columns: [
        {
            field: 'col1', width: '25%', title: 'dependenciesPackages', align: 'center'
        },
        {
            field: 'col2', width: '25%', title: 'Version', align: 'center'
        },
        {
            field: 'col3', width: '25%', title: 'devDependenciesPackages', align: 'center'
        },
        {
            field: 'col4', width: '25%', title: 'Version', align: 'center'
        },
    ],
    data: []
})

const getDependencies = () => {
    dloading.loading = true

    let dependencies = config.dependencies
    let devDependencies = config.devDependencies

    let dependenciesInfoArr: Array<any>[] = []
    let dependenciesVerArr: Array<any>[] = []
    let devDependenciesInfoArr: Array<any>[] = []
    let devDependenciesVerArr: Array<any>[] = []

    let dependenciesLength = 0
    let devDependenciesLength = 0

    for (let i in dependencies) {
        dependenciesInfoArr.push(i as any)
        dependenciesVerArr.push((dependencies as any)[i]),
            dependenciesLength++
    }

    console.log(dependenciesInfoArr, dependenciesVerArr)

    for (let j in devDependencies) {
        devDependenciesInfoArr.push(j as any)
        devDependenciesVerArr.push((devDependencies as any)[j]),
            devDependenciesLength++
    }

    console.log(devDependenciesInfoArr, devDependenciesVerArr)

    let temp :any = []

    if (dependenciesLength > devDependenciesLength) {
        for (let i in dependenciesInfoArr) {
            temp.push({
                col1: dependenciesInfoArr[i],
                col2: dependenciesVerArr[i],
                col3: devDependenciesInfoArr[i],
                col4: devDependenciesVerArr[i]
            })
        }
    } else if (devDependenciesLength > dependenciesLength) {
        for (let j in devDependenciesInfoArr) {
            temp.push({
                col1: dependenciesInfoArr[j],
                col2: dependenciesVerArr[j],
                col3: devDependenciesInfoArr[j],
                col4: devDependenciesVerArr[j]
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

<style scoped>
</style>