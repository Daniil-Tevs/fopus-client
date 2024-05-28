import Button from '/src/components/ui/button/Button'

import Layout from '/src/components/layout/Layout'

import styles from './Main.module.scss'

const Main = () => {
	return (
		<Layout>
			<main className={styles.main}>
				<div className={styles.wrapperInner}>
					<div>
						<p className={styles.headline}>Сервис Fopus</p>
						<h1>
							Место, где <span>каждый фотограф</span> найдёт своих клиентов
						</h1>
						<div className={styles.info}>
							<p>
								У нас более 10 000 сделок каждый месяц и мы гордимся каждой из
								них
							</p>
							<p>
								Здесь собраны профессиональные фотографы, которые готовы
								выполнить ваш заказ с настоящим мастерством и в короткие сроки
							</p>
						</div>

						<div className={styles.buttons}>
							<Button
								clickHandler={() => {
									window.location = '/auth/user/'
								}}
								size='xl'
							>
								Найти фотографа
							</Button>
							<Button
								clickHandler={() => {
									window.location = '/auth/organization/'
								}}
								type='white'
								size='xl'
							>
								Предложить свои услуги
							</Button>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default Main
