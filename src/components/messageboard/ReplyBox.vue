<script setup lang="ts">
import CommentBox from './CommentBox.vue'

const emit = defineEmits(['submit'])

const showCommentBox = ref(false)
</script>

<template>
  <el-button
    class="mb-4 text-blue-600"
    :class="[showCommentBox ? 'pb-2' : 'pb-10']"
    @click="showCommentBox = !showCommentBox"
  >
    回复
  </el-button>
  <CommentBox
    v-if="showCommentBox"
    class="mb-4"
    @submit="emit('submit', $event); showCommentBox = false;"
  />
</template>

<style scoped>
</style>