import { $axios } from '/src/api'

class GoodService {
	async add(params) {
		try {
			const { data } = await $axios.post(`/good/`, params)

			return data
		} catch (error) {
			console.error(error)
			throw new Error(error)
		}
	}
	async edit(goodId, params) {
		try {
			const { data } = await $axios.put(`/good/${goodId}`, params)

			return data
		} catch (error) {
			console.error(error)
			throw new Error(error)
		}
	}
	async delete(goodId) {
		try {
			const { data } = await $axios.delete(`/good/${goodId}`)

			return data
		} catch (error) {
			console.error(error)
			throw new Error(error)
		}
	}
}

export default new GoodService()
