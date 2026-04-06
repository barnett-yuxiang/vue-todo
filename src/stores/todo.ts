import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

// 从 localStorage 读取初始数据
function loadFromStorage(): Todo[] | null {
  try {
    const raw = localStorage.getItem('vue-todo-list')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null  // JSON 解析失败时降级，不崩溃
  }
}

export const useTodoStore = defineStore('todo', () => {
  // 优先用 localStorage 的数据，没有才用默认值
  const todos = ref<Todo[]>(
    loadFromStorage() ?? [
      { id: 1, text: '学习 Vue3 响应式', done: false },
      { id: 2, text: '学习 Pinia 状态管理', done: false },
    ]
  )

  const remaining = computed(() => todos.value.filter(t => !t.done).length)
  const completedCount = computed(() => todos.value.filter(t => t.done).length)

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

  // 监听 todos 变化，自动写入 localStorage
  watch(
    todos,
    (newVal) => {
      localStorage.setItem('vue-todo-list', JSON.stringify(newVal))
    },
    { deep: true }   // ← 深度监听，对象内部属性变化也能捕获
  )

  return { todos, remaining, completedCount, addTodo, toggleTodo, removeTodo }
})
