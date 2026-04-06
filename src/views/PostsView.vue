<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

const router = useRouter()

// 三个状态：数据、加载中、错误
const posts = ref<Post[]>([])
const loading = ref(false)
const error = ref('')

async function fetchPosts() {
  loading.value = true
  error.value = ''

  try {
    const res = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=10')
    posts.value = res.data
  } catch (err) {
    error.value = '请求失败，请检查网络'
    console.error(err)
  } finally {
    loading.value = false   // 无论成功失败都要关 loading
  }
}

// 组件挂载后自动请求
onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div style="max-width: 600px; margin: 40px auto; font-family: sans-serif;">
    <h1>文章列表</h1>
    <p style="color: #888; font-size: 14px;">数据来源：JSONPlaceholder 公开测试 API</p>

    <!-- 加载中 -->
    <div v-if="loading" style="text-align: center; padding: 40px; color: #888;">
      加载中...
    </div>

    <!-- 错误 -->
    <div v-else-if="error" style="color: red; padding: 16px;">
      {{ error }}
      <button @click="fetchPosts" style="margin-left: 12px;">重试</button>
    </div>

    <!-- 数据 -->
    <div v-else>
      <div
        v-for="post in posts"
        :key="post.id"
        style="border: 1px solid #eee; border-radius: 8px; padding: 16px; margin-bottom: 12px;"
      >
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 15px; text-transform: capitalize;">
            {{ post.title }}
          </h3>
          <span style="font-size: 12px; color: #aaa;">#{{ post.id }}</span>
        </div>
        <p style="margin: 8px 0 0; color: #666; font-size: 14px; line-height: 1.5;">
          {{ post.body }}
        </p>
      </div>
    </div>

    <div style="margin-top: 24px; display: flex; gap: 12px;">
      <button @click="router.back()">← 返回</button>
      <button @click="fetchPosts" :disabled="loading">刷新</button>
    </div>
  </div>
</template>
