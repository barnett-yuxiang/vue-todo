<script setup lang="ts">
// defineProps：声明这个组件从外部接收什么数据
const props = defineProps<{
  id: number
  text: string
  done: boolean
}>()

// defineEmits：声明这个组件会向外发出什么事件
const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <li style="display: flex; align-items: center; gap: 8px; margin: 8px 0;">
    <input
      type="checkbox"
      :checked="props.done"
      @change="emit('toggle', props.id)"
    />
    <span :style="{ textDecoration: props.done ? 'line-through' : 'none', flex: 1 }">
      {{ props.text }}
    </span>
    <button @click="emit('remove', props.id)">删除</button>
  </li>
</template>