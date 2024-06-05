import logo from '/icons/logo.svg'
import { TOKEN } from '/src/app.constants'
import Cookies from 'js-cookie'
import { MdLogout } from 'react-icons/md'
import { VscAccount, VscFeedback } from 'react-icons/vsc'
import { Link } from 'react-router-dom'

import Button from '/src/components/ui/button/Button'

import { useAuth } from '/src/hooks/useAuth'

import styles from './Header.module.scss'

const Header = () => {
	const { isAuth } = useAuth()
	const userRole = +Cookies.get('role')

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<Link to='/'>
					<img src={logo} alt='' />
				</Link>

				<div className={styles.nav}>
					{isAuth ? (
						<>
							<MdLogout
								onClick={() => {
									Cookies.remove(TOKEN)
									Cookies.remove('role')
									document.location = '/auth'
								}}
							/>
							<VscFeedback
								onClick={() => {
									document.location = '/feedback'
								}}
							/>
						</>
					) : (
						''
					)}

					{userRole !== 2 ? (
						<>
							<Link to={!isAuth ? '/auth' : '/profile'}>
								<VscAccount />
							</Link>
							<Button
								clickHandler={() =>
									(document.location = !isAuth ? '/auth' : '/')
								}
							>
								Посмотреть цены
							</Button>
						</>
					) : (
						<></>
					)}

					{/* <VscMenu /> */}
				</div>
			</div>
		</header>
	)
}

export default Header
