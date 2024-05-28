import logo from '/icons/logo-footer.svg'

import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.left}>
					<img src={logo} alt='' />
					<p>Copyright © 2021 UI8 LLC</p>
				</div>
				{/* <Link to='mailto:dev_v_ved@mail.ru'>dev_v_ved@mail.ru</Link> */}
				<a className={styles.helpLink} href='mailto:dev_v_ved@mail.ru'>
					dev_v_ved@mail.ru
				</a>
			</div>
		</footer>
	)
}

export default Footer
