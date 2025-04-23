import { createWebHashHistory, createRouter } from 'vue-router'

import Home from './Home.vue'
import Dataset from './Dataset.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/:dataset_id', component: Dataset },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})