<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TodoItem from '../components/TodoItem.vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

const router = useRouter()

const todos = ref<Todo[]>([
  { id: 1, text: '学习 Vue3 响应式', done: false },
  { id: 2, text: '学习 Pinia 状态管理', done: false },
])

const inputText = ref('')
const remaining = computed(() => todos.value.filter(t => !t.done).length)

function addTodo() {
  if (!inputText.value.trim()) return
  todos.value.push({ id: Date.now(), text: inputText.value.trim(), done: false })
  inputText.value = ''
}

function toggleTodo(id: number) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.done = !todo.done
}

function removeTodo(id: number) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<template>
  <div style="max-width: 500px; margin: 40px auto; font-family: sans-serif;">
    <h1>Todo App</h1>
    <p>剩余未完成：{{ remaining }} 项</p>

    <div>
      <input v-model="inputText" placeholder="输入任务..." @keyup.enter="addTodo" />
      <button @click="addTodo">添加</button>
    </div>

    <ul style="padding: 0; list-style: none;">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :id="todo.id"
        :text="todo.text"
        :done="todo.done"
        @toggle="toggleTodo"
        @remove="removeTodo"
      />
    </ul>

    <hr style="margin-top: 40px;" />
    <button @click="router.push('/about')">去关于页面 →</button>
  </div>
</template>
