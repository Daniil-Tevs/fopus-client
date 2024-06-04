import cn from 'clsx'
import { Link } from 'react-router-dom'

import Loader from '/src/components/ui/Loader'
import OrderCard from '/src/components/ui/card/order/OrderCard'
import Empty from '/src/components/ui/empty/Empty'

import { useProfileUser } from '/src/hooks/useProfileUser'

import Layout from '/src/components/layout/Layout'

import styles from './ProfileUser.module.scss/'

const ProfileUser = ({ user }) => {
	const { data, isLoading } = useProfileUser()

	if (isLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	const orders = data

	let amountOrders = 0
	orders.forEach(order => {
		if (order.order_status.ID > 0) amountOrders++
	})

	return (
		<Layout seoKey='profile'>
			<div className={styles.profile}>
				<section className={styles.info}>
					<div className={styles.head}>
						<p className={styles.role}>
							{user && user.ID === 2 ? 'Фотограф' : 'Клиент'}
							{''}
						</p>
						<p className={styles.name}>
							{user.SURNAME} {user.NAME} {user.PARENT_NAME}
						</p>
					</div>

					<div className={styles.statistic}>
						<div>
							<p>Информация</p>
							<div>
								<p>Количество заказов:</p>
								<span>{amountOrders}</span>
							</div>
						</div>

						<div>
							<p>Контакты</p>
							<div className={styles.statistic}>
								<p>Почта:</p>
								<span>
									<Link to={'mailto:' + user.EMAIL}>{user.EMAIL}</Link>
								</span>
							</div>
						</div>
					</div>
				</section>

				<section className={styles.detail}>
					<div className={cn('switcher', styles.switcher)}>
						<input
							name='switcher'
							type='radio'
							id='orders'
							checked={true}
							onChange={() => {}}
						/>
						<label htmlFor='orders'>Заказы ({amountOrders})</label>
					</div>

					<div className={styles.content}>
						{orders.length > 0 ? (
							orders.map(order => (
								<OrderCard user={user} data={order} key={order.ID} />
							))
						) : (
							<Empty>К сожалению здесь пока пусто</Empty>
						)}
					</div>
				</section>
			</div>
		</Layout>
	)
}

export default ProfileUser
