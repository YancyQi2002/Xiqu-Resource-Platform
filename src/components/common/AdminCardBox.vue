<template>
    <div class="p-3 bg-white rounded shadow-md">
        <div class="title mb-2 px-2 border-b border-gray-200">
            <slot name="header" />
        </div>
        <slot/>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>