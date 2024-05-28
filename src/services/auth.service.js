import { $axios } from '/src/api'
import { TOKEN } from '/src/app.constants'
import Cookies from 'js-cookie'

class AuthService {
	async main(params, type) {
		try {
			const { data } = await $axios.post(`/auth/${type}`, params)

			if (data.token) {
				Cookies.set(TOKEN, data.token)
				Cookies.set('role', data.user.ROLE_ID)
			}

			return data
		} catch (error) {
			console.error(error)
			throw new Error(error)
		}
	}
}

export default new AuthService()
