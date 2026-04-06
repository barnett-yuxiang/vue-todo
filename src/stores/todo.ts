import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  // State
  const todos = ref([
    { id: 1, text: '学习 Vue3 响应式', done: false },
    { id: 2, text: '学习 Pinia 状态管理', done: false },
  ])

  // Getters（等价于 computed）
  const remaining = computed(() => todos.value.filter(t => !t.done).length)
  const completedCount = computed(() => todos.value.filter(t => t.done).length)

  // Actions（等价于 methods）
  function addTodo(text: string) {
    todos.value.push({ id: Date.now(), text, done: false })
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.done = !todo.done
  }

  function removeTodo(id: number) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  return { todos, remaining, completedCount, addTodo, toggleTodo, removeTodo }
})
