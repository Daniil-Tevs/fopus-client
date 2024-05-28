import Layout from '/src/components/layout/Layout'

import styles from './NotFound.module.scss'

const NotFound = () => {
	return (
		<>
			<Layout>
				<main className={styles.main}>404 Not found</main>
			</Layout>
		</>
	)
}

export default NotFound
