import { $axios } from '/src/api'

class OrderService {
	async add(params) {
		try {
			const { data } = await $axios.post(`/order/`, params)

			return data
		} catch (error) {
			console.error(error)
			throw new Error(error)
		}
	}
	async edit(orderId, params) {
		try {
			const { data } = await $axios.patch(`/order/${orderId}`, params)

			return data
		} catch (error) {
			console.error(error)
			throw new Error(error)
		}
	}

	async getOrders() {
		try {
			const { data } = await $axios.get(`/order`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
	async getList() {
		try {
			const { data } = await $axios.get(`/order/type-order-speed/`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new OrderService()
