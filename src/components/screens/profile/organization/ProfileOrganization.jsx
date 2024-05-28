import cn from 'clsx'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '/src/components/ui/button/Button.jsx'
import GoodCard from '/src/components/ui/card/good/GoodCard'
import OrderCard from '/src/components/ui/card/order/OrderCard'
import Empty from '/src/components/ui/empty/Empty'
import FormGoodAdd from '/src/components/ui/form/good/add/FormGoodAdd'
import Modal from '/src/components/ui/modal/Modal'

import { useProfile } from '/src/hooks/useProfile'

import Layout from '/src/components/layout/Layout'

import styles from './ProfileOrganization.module.scss/'

const ProfileOrganization = () => {
	const [tab, setTab] = useState('goods')
	const [active, setActivity] = useState(false)
	const [modalContent, setModalContent] = useState()
	const { user, goods, orders, amountOrder, amountNewOrder, isLoading } =
		useProfile()

	if (isLoading) {
		return <div>Загрузка...</div>
	}

	return (
		<Layout seoKey='profile'>
			<Modal active={active} setActivity={setActivity}>
				{modalContent}
			</Modal>

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
							<div className={styles.statistic}>
								<p>Количество товаров:</p>
								<span>{goods ? goods.length : 0}</span>
							</div>
							<div>
								<p>Количество заказов:</p>
								<span>{amountOrder}</span>
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
							id='goods'
							checked={tab === 'goods'}
							onChange={() => setTab('goods')}
						/>
						<label htmlFor='goods'>Товары ({goods ? goods.length : 0})</label>
						<input
							name='switcher'
							type='radio'
							id='orders'
							checked={tab === 'orders'}
							onChange={() => setTab('orders')}
						/>
						<label htmlFor='orders'>
							Заказы {amountOrder > 0 ? '(' + amountOrder + ')' : ''}
						</label>
						<input
							name='switcher'
							type='radio'
							id='newOrders'
							checked={tab === 'newOrders'}
							onChange={() => setTab('newOrders')}
						/>
						<label htmlFor='newOrders'>Заявки ({amountNewOrder})</label>
					</div>

					{tab === 'goods' ? (
						<>
							<div className={styles.addPanel}>
								<Button
									clickHandler={() => {
										setActivity(true)
										setModalContent(
											<FormGoodAdd
												goods={goods}
												setModalContent={setModalContent}
											/>
										)
									}}
								>
									Добавить
								</Button>
							</div>
						</>
					) : (
						<></>
					)}

					<div className={styles.content}>
						{tab === 'goods' ? (
							goods.length > 0 ? (
								goods.map(good => (
									<GoodCard
										user={user}
										data={good}
										key={good.ID}
										setActivity={setActivity}
										setModalContent={setModalContent}
									/>
								))
							) : (
								<Empty></Empty>
							)
						) : (
							''
						)}

						{tab === 'orders' ? (
							orders.length - amountNewOrder > 0 ? (
								orders.map(order => {
									if (order.order_status.ID !== 1)
										return (
											<OrderCard
												user={user}
												type='order'
												data={order}
												key={order.ID}
											/>
										)
								})
							) : (
								<Empty>К сожалению, здесь пока пусто</Empty>
							)
						) : (
							''
						)}

						{tab === 'newOrders' ? (
							amountNewOrder > 0 ? (
								orders.map(order => {
									if (order.order_status.ID === 1)
										return (
											<OrderCard
												user={user}
												type='newOrder'
												data={order}
												key={order.ID}
											/>
										)
								})
							) : (
								<Empty>К сожалению, здесь пока пусто</Empty>
							)
						) : (
							''
						)}
					</div>
				</section>
			</div>
		</Layout>
	)
}

export default ProfileOrganization
