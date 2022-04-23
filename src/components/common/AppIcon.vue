<script setup lang="ts">
const props = defineProps<{
    icon: string
}>()
</script>

<template>
    <div>
        <span class="iconify" :data-icon="props.icon"></span>
    </div>
</template>

<style scoped>

</style>