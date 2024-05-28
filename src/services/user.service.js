import { $axios } from '/src/api.js'

class UserService {
	async getProfile() {
		try {
			const data = {}
			const user = await $axios.get(`/user`)
			const goods = await $axios.get(`/good`)
			const orders = await $axios.get(`/order`)

			data['user'] = await user.data
			data['goods'] = await goods.data
			data['orders'] = await orders.data

			return data
		} catch (error) {
			throw new Error(error)
		}
	}

	async getUser() {
		try {
			const { data } = await $axios.get(`/user`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}

	async getAllSeller() {
		try {
			const { data } = await $axios.get(`user/seller`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new UserService()
