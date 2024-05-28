import { $axios } from '/src/api'

class CatalogService {
	async getGoods(filters) {
		try {
			const { data } = await $axios.get(`/good/all/`, {
				params: {
					filters: filters
				}
			})
			return data
		} catch (error) {
			console.error(error)
			throw new Error(error)
		}
	}
}

export default new CatalogService()
