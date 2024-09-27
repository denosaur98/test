import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
	state() {
		return {
			pageNumber: 1,
			spaceshipData: null,
		}
	},
	mutations: {
		setSpaceshipData(state, data) {
			state.spaceshipData = data
		},
		setPageNumber(state, pageNumber) {
			state.pageNumber = pageNumber
		},
	},
	actions: {
		async fetchSpaceshipData({ commit, state }) {
			try {
				const response = await axios.get(`https://swapi.dev/api/starships/?page=${state.pageNumber}`)
				commit('setSpaceshipData', response.data)
			} catch (error) {
				console.error('Ошибка: ', error)
			}
		},
	},
})
