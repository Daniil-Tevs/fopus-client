import { $axios } from '/src/api'

class PhotoService {
	async getList() {
		try {
			const { data } = await $axios.get(`/photo/`)
			return data
		} catch (error) {
			console.error(error)
			throw new Error(error)
		}
	}
}

export default new PhotoService()
