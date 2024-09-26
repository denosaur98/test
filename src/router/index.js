import { createWebHistory, createRouter } from 'vue-router'
import SpaceshipPage from '@/pages/SpaceshipPage.vue'

const routes = [{ path: '/', component: SpaceshipPage }]

export default createRouter({
	history: createWebHistory(),
	routes,
})
