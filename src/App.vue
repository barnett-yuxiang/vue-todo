<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0)
</script>

<template>
  <div>
    <h1>Vue Todo App</h1>
    <p>count: {{ count }}</p>
    <button @click="count++">+1</button>
  </div>
</template>
