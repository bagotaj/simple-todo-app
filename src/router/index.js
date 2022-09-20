import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ToDosView from '@/views/todos/ToDosView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/todos',
    name: 'todos',
    component: ToDosView,
    props: true,
    meta: {
      authRequired: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
