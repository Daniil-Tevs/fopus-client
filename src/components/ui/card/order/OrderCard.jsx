import orderService from '/src/services/order.service'
import { useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import { Link } from 'react-router-dom'

import styles from './OrderCard.module.scss'

const OrderCard = ({ type, data, user }) => {
	const queryClient = useQueryClient()
	data.orderImagePath = `/order-status/${data.order_status.ID}.svg`
	return (
		<>
			<div
				id={data.ID}
				className={cn(
					'status-' + data.order_status.ID,
					styles['status-' + data.order_status.ID],
					styles.order
				)}
			>
				<div className={styles.info}>
					<div>
						<p className={styles.title}>Заявка#{data.ID}</p>
						<ul>
							<li>
								<p>Статус:</p>
								<span
									className={cn(
										styles.bold,
										data.order_status.ID === 6 ? styles.green : styles.purple,
										data.order_status.ID === 0 ? styles.red : ''
									)}
								>
									{data.order_status.NAME}
								</span>
							</li>
							<li>
								<p>Скорость:</p>
								<span>{data.type_speed_order.NAME}</span>
							</li>
							<li>
								<p>Дата съёмки:</p>
								<span>{data.DATA_CREATED.split('T')[0]}</span>
							</li>
							{data.DATA_GIVE_PHOTO ? (
								<>
									<li>
										<p>Дата фотографирования:</p>
										<span>{data.DATA_GIVE_PHOTO.split('T')[0]}</span>
									</li>
								</>
							) : (
								<></>
							)}
						</ul>
					</div>
					<div>
						<img src={data.orderImagePath} alt='Фото заказа' />
					</div>
				</div>
				<hr />
				<div className={styles.photo}>
					<ul>
						<li>
							<p>Фото:</p>
							<span>{data.photo.NAME}</span>
						</li>
						<li>
							<p>Количество:</p>
							<span>{data.AMOUNT_PHOTO}</span>
						</li>
					</ul>
				</div>
				<hr />
				<div className={styles.client}>
					<ul>
						<li>
							<p>Клиент:</p>
							<span>
								{data.people_photo_order_BUYER_IDTopeople.SURNAME}{' '}
								{data.people_photo_order_BUYER_IDTopeople.NAME}{' '}
								{data.people_photo_order_BUYER_IDTopeople.PARENT_NAME}{' '}
							</span>
						</li>
						<li>
							<p>Почта:</p>
							<span>
								<Link
									to={
										'mailto:' + data.people_photo_order_BUYER_IDTopeople.EMAIL
									}
								>
									{data.people_photo_order_BUYER_IDTopeople.EMAIL}
								</Link>
							</span>
						</li>
					</ul>
				</div>
				<hr />
				<div className={styles.control}>
					<div className={styles.price}>{data.COST} ₽/шт.</div>

					{user.ROLE_ID === 2 ? (
						data.order_status.ID === 0 || data.order_status.ID == 6 ? (
							<></>
						) : (
							<>
								<div className={styles.sellerPanel}>
									{data.order_status.ID === 1 ? (
										<>
											<div
												onClick={() => {
													orderService.edit(data.ID, { statusId: 2 })
													queryClient.invalidateQueries(['profile'])
												}}
											>
												<img src='/icons/yes.svg' alt='Next' />
											</div>
											<div
												onClick={() => {
													orderService.edit(data.ID, { statusId: 0 })
													queryClient.invalidateQueries(['profile'])
												}}
											>
												<img src='/icons/no.svg' alt='No' />
											</div>
										</>
									) : (
										<></>
									)}

									{data.order_status.ID > 1 && data.order_status.ID < 5 ? (
										<>
											<div
												onClick={() => {
													orderService.edit(data.ID, {
														statusId: data.order_status.ID + 1
													})
													queryClient.invalidateQueries(['profile'])
												}}
											>
												<p>Далее</p>
												<img src='/icons/yes.svg' alt='Next' />
											</div>
										</>
									) : (
										<></>
									)}

									{data.order_status.ID === 5 ? (
										<>
											<div style={{ cursor: 'inherit !important' }}>
												<p>Ожидайте...</p>
											</div>
										</>
									) : (
										<></>
									)}
								</div>
							</>
						)
					) : data.order_status.ID === 1 ? (
						<div className={styles.sellerPanel}>
							<div
								onClick={() => {
									orderService.edit(data.ID, { statusId: 0 })
									queryClient.invalidateQueries(['orders'])
									setTimeout(
										() => queryClient.invalidateQueries(['orders']),
										500
									)
								}}
							>
								<p className={styles.red}>Отменить</p>
								<img src='/icons/no.svg' alt='No' />
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</>
	)
}

export default OrderCard
