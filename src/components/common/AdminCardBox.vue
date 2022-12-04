<script setup lang="ts">

</script>

<template>
  <div class="rounded bg-white p-3 shadow-md">
    <div class="title mb-2 border-b border-gray-200 px-2">
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>

<style scoped>

</style>