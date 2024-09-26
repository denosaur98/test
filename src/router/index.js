import { createWebHistory, createRouter } from 'vue-router'
import SpaceshipList from '@/pages/SpaceshipList.vue'
import SpaceshipPage from '@/pages/SpaceshipPage.vue'

const routes = [
	{ path: '/', component: SpaceshipList },
	{ path: '/starships/:id', component: SpaceshipPage },
]

export default createRouter({
	history: createWebHistory(),
	routes,
})
