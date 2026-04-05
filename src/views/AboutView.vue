<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div style="max-width: 500px; margin: 40px auto; font-family: sans-serif;">
    <h1>关于</h1>
    <p>这是一个 Vue 3 + Vite + TypeScript 的 Todo 应用。</p>
    <p>用于学习 Vue Router、Pinia 等核心概念。</p>

    <div style="margin-top: 40px; display: flex; gap: 12px;">
      <button @click="router.back()">← 返回</button>
      <button @click="router.push('/')">回首页</button>
    </div>
  </div>
</template>
