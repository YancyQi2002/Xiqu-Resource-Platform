<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
</script>

<template>
    <Disclosure v-slot="{ open }">
        <DisclosureButton
            class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>西皮</span>
            <app-icon icon="fa-solid:chevron-circle-down" :class="open ? 'rotate-180 transform pt-1' : ''"
                class="mt-2 h-5 w-5 text-purple-500" />
        </DisclosureButton>
        <DisclosurePanel class="px-2 py-2  text-sm text-gray-500">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                <li>
                    西皮导板
                </li>
                <li>
                    西皮原板
                </li>
                <li>
                    西皮慢板（西皮三眼）
                </li>
                <li>
                    西皮快三眼
                </li>
                <li>
                    西皮快板
                </li>
                <li>
                    西皮紧板
                </li>
                <li>
                    西皮垛板
                </li>
                <li>
                    西皮流水
                </li>
                <li>
                    西皮二六
                </li>
                <li>
                    西皮快二六
                </li>
                <li>
                    西皮散板
                </li>
                <li>
                    西皮摇板
                </li>
                <li>
                    西皮滚板
                </li>
                <li>
                    西皮回龙
                </li>
                <li>
                    西皮娃娃调
                </li>
                <li>
                    南梆子
                </li>
                <li>
                    反西皮
                </li>
            </ul>
        </DisclosurePanel>
    </Disclosure>
    <Disclosure as="div" class="mt-2" v-slot="{ open }">
        <DisclosureButton
            class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>二黄</span>
            <app-icon icon="fa-solid:chevron-circle-down" :class="open ? 'rotate-180 transform pt-1' : ''"
                class="mt-2 h-5 w-5 text-purple-500" />
        </DisclosureButton>
        <DisclosurePanel class="px-2 py-2  text-sm text-gray-500">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                <li>
                    二黄导板
                </li>
                <li>
                    二黄原板
                </li>
                <li>
                    二黄慢板（二黄三眼）
                </li>
                <li>
                    二黄快三眼
                </li>
                <li>
                    二黄快板
                </li>
                <li>
                    二黄碰板
                </li>
                <li>
                    二黄顶板
                </li>
                <li>
                    二黄垛板
                </li>
                <li>
                    二黄流水
                </li>
                <li>
                    二黄二六
                </li>
                <li>
                    二黄快二六
                </li>
                <li>
                    二黄散板
                </li>
                <li>
                    二黄摇板
                </li>
                <li>
                    二黄滚板
                </li>
                <li>
                    二黄回龙
                </li>
                <li>
                    二黄平板（四平调）
                </li>
                <li>
                    反二黄
                </li>
                <li>
                    反四平调
                </li>
            </ul>
        </DisclosurePanel>
    </Disclosure>
    <Disclosure as="div" class="mt-2" v-slot="{ open }">
        <DisclosureButton
            class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>高拨子</span>
            <app-icon icon="fa-solid:chevron-circle-down" :class="open ? 'rotate-180 transform pt-1' : ''"
                class="mt-2 h-5 w-5 text-purple-500" />
        </DisclosureButton>
        <DisclosurePanel class="px-2 py-2  text-sm text-gray-500">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                <li>
                    高拨子导板
                </li>
                <li>
                    高拨子原板
                </li>
                <li>
                    高拨子慢板
                </li>
                <li>
                    高拨子快板
                </li>
                <li>
                    高拨子垛板
                </li>
                <li>
                    高拨子碰板
                </li>
                <li>
                    高拨子顶板
                </li>
                <li>
                    高拨子散板
                </li>
                <li>
                    高拨子摇板
                </li>
                <li>
                    高拨子回龙
                </li>
                <li>
                    反二黄高拨子（反高拨子）
                </li>
            </ul>
        </DisclosurePanel>
    </Disclosure>
    <Disclosure as="div" class="mt-2" v-slot="{ open }">
        <DisclosureButton
            class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>联弹</span>
            <app-icon icon="fa-solid:chevron-circle-down" :class="open ? 'rotate-180 transform pt-1' : ''"
                class="mt-2 h-5 w-5 text-purple-500" />
        </DisclosureButton>
        <DisclosurePanel class="px-2 py-2  text-sm text-gray-500">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                <li>
                    五音联弹
                </li>
                <li>
                    九音联弹
                </li>
                <li>
                    西皮联弹
                </li>
                <li>
                    二黄联弹
                </li>
                <li>
                    高拨子联弹
                </li>
                <li>
                    昆腔联弹
                </li>
                <li>
                    评剧联弹
                </li>
                <li>
                    艄公调联弹
                </li>
                <li>
                    改良调五音联弹
                </li>
            </ul>
        </DisclosurePanel>
    </Disclosure>
    <Disclosure as="div" class="mt-2" v-slot="{ open }">
        <DisclosureButton
            class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>唢呐</span>
            <app-icon icon="fa-solid:chevron-circle-down" :class="open ? 'rotate-180 transform pt-1' : ''"
                class="mt-2 h-5 w-5 text-purple-500" />
        </DisclosureButton>
        <DisclosurePanel class="px-2 py-2 text-sm text-gray-500">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                <li>
                    唢呐西皮
                </li>
                <li>
                    唢呐二黄
                </li>
                <li>
                    唢呐高拨子
                </li>
            </ul>
        </DisclosurePanel>
    </Disclosure>
</template>

<style scoped>
li {
    @apply leading-8;
}

span {
    @apply -mt-1 font-medium text-2xl text-black;
    font-family: 'YSXK';
}
</style>