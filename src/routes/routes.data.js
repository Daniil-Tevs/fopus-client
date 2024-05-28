import Auth from '/src/components/screens/auth/Auth.jsx'
import RegisterOrg from '/src/components/screens/auth/organization/RegisterOrg.jsx'
import RegisterUser from '/src/components/screens/auth/user/RegisterUser.jsx'
import Catalog from '/src/components/screens/catalog/Catalog'
import Main from '/src/components/screens/main/Main.jsx'
import Profile from '/src/components/screens/profile/Profile'

export const routes = [
	{
		path: '/',
		component: Catalog,
		isAuth: true
	},
	{
		path: '/',
		component: Main,
		isAuth: false
	},
	{
		path: '/auth',
		component: Auth,
		isAuth: false
	},
	{
		path: '/auth/user',
		component: RegisterUser,
		isAuth: false
	},
	{
		path: '/auth/organization',
		component: RegisterOrg,
		isAuth: false
	},
	{
		path: '/profile',
		component: Profile,
		isAuth: true
	}
]
