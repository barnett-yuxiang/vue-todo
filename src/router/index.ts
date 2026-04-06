import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PostsView from '../views/PostsView.vue'

const router = createRouter({
  history: createWebHistory(),   // 用浏览器原生 History API
  routes: [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/posts', component: PostsView },
  ],
})

export default router
