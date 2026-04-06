<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'

const router = useRouter()
const store = useTodoStore()
</script>

<template>
  <div style="max-width: 500px; margin: 40px auto; font-family: sans-serif;">
    <h1>关于</h1>
    <p>这是一个 Vue 3 + Vite + TypeScript 的 Todo 应用。</p>

    <!-- 跨页面读取 store 数据 -->
    <div style="margin: 24px 0; padding: 16px; background: #f5f5f5; border-radius: 8px;">
      <p>📋 总任务数：{{ store.todos.length }} 项</p>
      <p>✅ 已完成：{{ store.completedCount }} 项</p>
      <p>⏳ 未完成：{{ store.remaining }} 项</p>
    </div>

    <div style="display: flex; gap: 12px;">
      <button @click="router.back()">← 返回</button>
      <button @click="router.push('/')">回首页</button>
    </div>
  </div>
</template>
