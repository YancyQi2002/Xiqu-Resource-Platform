<script setup lang="ts">
const emit = defineEmits(['submit'])

const content = ref('')

const handleSubmit = (e: any) => {
  e.preventDefault()
  emit('submit', content.value)
  content.value = ''
}
</script>

<template>
  <form
    class="grid"
    @submit="handleSubmit"
  >
    <el-input
      v-model="content"
      name="comment"
      type="textarea"
      placeholder="请输入您的留言"
      class="rounded p-2"
    />
    <fieldset class="py-4">
      <input
        type="submit"
        value="评论"
        class="rounded border bg-blue-600 px-4 py-1 text-white"
      >
      <input
        type="reset"
        value="取消"
        class="ml-3 rounded border bg-white px-4 py-1"
      >
    </fieldset>
  </form>
</template>

<style scoped>
</style>