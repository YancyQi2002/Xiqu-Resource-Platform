<template>
    <div>
        <span class="iconify" :data-icon="props.icon"></span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    icon: string
}>()
</script>

<style scoped>

</style>