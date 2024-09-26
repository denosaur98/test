import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
	state() {
		return {
			spaceshipData: null,
		}
	},
	mutations: {
		setSpaceshipData(state, data) {
			state.spaceshipData = data
		},
	},
	actions: {
		async fetchSpaceshipData({ commit }) {
			try {
				const response = await axios.get('https://swapi.dev/api/starships/')
				commit('setSpaceshipData', response.data)
			} catch (error) {
				console.error('Ошибка: ', error)
			}
		},
	},
})
