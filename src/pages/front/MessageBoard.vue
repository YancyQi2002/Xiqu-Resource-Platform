<script setup lang="ts">
import CommentBox from '@/components/messageboard/CommentBox.vue'
import DividerHorizontal from '@/components/messageboard/DividerHorizontal.vue'
import CommentItem from '@/components/messageboard/CommentItem.vue'
import ReplyContainer from '@/components/messageboard/ReplyContainer.vue'
import ReplyBox from '@/components/messageboard/ReplyBox.vue'
import { addUrl, getUrl } from '@/utils/api'

const rid = ref(4)

const comments: any = ref([])

async function getAllComments() {
  const res = await fetch(getUrl)
  console.log(res)
  comments.value = await res.json()
}

onMounted(() => {
  getAllComments()
})

// const constructNewComment = (content) => {
//     return {
//         id: rid.value++,
//         user: "当前用户",
//         avatar: face,
//         content,
//         time: "1 秒前",
//     }
// }

// const addNewComment = (content) => {
//     const newComment = constructNewComment(content)
//     comments.value.push(newComment)
// }

// const addReply = (content, id) => {
//     const reply = constructNewComment(content)
//     let comment = comments.value.find((comment) => comment.id === id)
//     if (comment.replies) {
//         comment.replies.push(reply)
//     } else {
//         comment.replies = [reply]
//     }
// }

const addNewComment = async (content: any, replyTo = '') => {
  const res = await fetch(`${addUrl}`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      ...(replyTo && { replyTo }),
    }),
  })

  const newComment: any = await res.json()

  if (!replyTo)
    comments.value.unshift(newComment)
  else
    comments.value.find((c: any) => c.id === replyTo).replies.unshift(newComment)

  // // 新增完评论后，自动获取最新的评论列表
  // // Notion API 有延迟，在添加完 page 之后，需要过一会才能获取到最新的评论列表
  // setTimeout(async () => {
  //     await getAllComments()
  // }, 1000)
}
</script>

<template>
  <main>
    <div class="container">
      <h2>留言</h2>

      <CommentBox @submit="addNewComment" />

      <!-- 分割线 -->
      <DividerHorizontal />

      <div
        v-for="comment in comments"
        :key="(comment as any).id"
      >
        <!-- 单个留言 -->
        <CommentItem
          :user="(comment as any).user"
          :avatar="(comment as any).avatar"
          :time="(comment as any).time"
          :content="(comment as any).content"
        />

        <!-- 回复列表 -->
        <ReplyContainer v-if="(comment as any).replies">
          <CommentItem
            v-for="reply in (comment as any).replies"
            :key="reply.id"
            :user="reply.user"
            :avatar="reply.avatar"
            :time="reply.time"
            :content="reply.content"
          />
        </ReplyContainer>

        <ReplyBox @submit="addNewComment($event, (comment as any).id)" />
      </div>
    </div>
  </main>
</template>

<style scoped>
h2 {
    @apply my-6 text-3xl;
}

main {
    @apply p-4 bg-gray-50 min-h-screen;
}

.container {
    @apply max-w-screen-xl mx-auto p-8 bg-white rounded-lg shadow-2xl;
}
</style>