<script setup lang="ts">
const content = ref("")

const emit = defineEmits(["submit"])

const handleSubmit = (e :any) => {
    e.preventDefault();
    emit("submit", content.value)
    content.value = ""
}
</script>

<template>
    <form class="grid" @submit="handleSubmit">
        <el-input
            v-model="content"
            name="comment"
            type="textarea"
            placeholder="请输入您的留言"
            class="p-2 rounded"
        >
        </el-input>
        <fieldset class="py-4">
            <input type="submit" value="评论" class="px-4 py-1 text-white bg-blue-600 border rounded" />
            <input type="reset" value="取消" class="ml-3 px-4 py-1 bg-white border rounded" />
        </fieldset>
    </form>
</template>

<style scoped>
</style>