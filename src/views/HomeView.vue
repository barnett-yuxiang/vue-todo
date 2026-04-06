<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'
import TodoItem from '../components/TodoItem.vue'

const router = useRouter()
const store = useTodoStore()

const inputText = ref('')

function addTodo() {
  if (!inputText.value.trim()) return
  store.addTodo(inputText.value.trim())
  inputText.value = ''
}
</script>

<template>
  <div style="max-width: 500px; margin: 40px auto; font-family: sans-serif;">
    <h1>Todo App</h1>
    <p>剩余未完成：{{ store.remaining }} 项</p>

    <div>
      <input v-model="inputText" placeholder="输入任务..." @keyup.enter="addTodo" />
      <button @click="addTodo">添加</button>
    </div>

    <ul style="padding: 0; list-style: none;">
      <TodoItem
        v-for="todo in store.todos"
        :key="todo.id"
        :id="todo.id"
        :text="todo.text"
        :done="todo.done"
        @toggle="store.toggleTodo"
        @remove="store.removeTodo"
      />
    </ul>

    <hr style="margin-top: 40px;" />
    <button @click="router.push('/about')">去关于页面 →</button>
  </div>
</template>
