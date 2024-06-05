import { $axios } from '/src/api'

class FeedbackService {
	async add(params) {
		try {
			const { data } = await $axios.post(`/feedback/`, params)
			return data
		} catch (error) {
			throw new Error(error.response.data.message)
		}
	}
}

export default new FeedbackService()
