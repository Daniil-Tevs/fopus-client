import axios from 'axios'
import Cookies from 'js-cookie'

import { TOKEN } from './app.constants'

// const API_URL = `${import.meta.env.VITE_SERVER_URL}/api`
// const API_URL = `http://90.156.229.25:8080/api`
const API_URL = `http://localhost:8080/api`

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: Cookies.get(TOKEN) ? `Bearer ${Cookies.get(TOKEN)}` : ''
	}
})
