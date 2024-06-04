import cn from 'clsx'

import FormGoodDelete from '/src/components/ui/form/good/delete/FormGoodDelete'
import FormGoodEdit from '/src/components/ui/form/good/edit/FormGoodEdit'

import styles from './GoodCard.module.scss'

const GoodCard = ({
	data,
	setModalContent,
	setActivity,
	type = undefined,
	clickHandler = () => {},
	user = {}
}) => {
	return (
		<div
			onClick={clickHandler}
			id={data.ID}
			className={cn(styles.good, type ? styles[type] : '')}
		>
			<div className={styles.head}>
				<div>
					<p className={styles.title}>{data.photo.NAME}</p>
					<ul>
						<li>
							<p>Размер:</p>
							<span>{data.photo.photo_size.NAME}</span>
						</li>
						<li>
							<p>Бумага:</p>
							<span>{data.photo.type_paper.NAME}</span>
						</li>
					</ul>
				</div>
				<div>
					<img src='/good.svg' alt='Фото товара' />
				</div>
			</div>
			<hr />
			<div className={styles.control}>
				<div className={styles.price}>{data.COST} ₽/шт.</div>

				{user && user.ROLE_ID === 2 ? (
					<>
						<div className={styles.sellerPanel}>
							<div
								onClick={() => {
									setActivity(true)
									setModalContent(
										<FormGoodEdit
											good={data}
											setModalContent={setModalContent}
										/>
									)
								}}
							>
								<img src='/icons/edit.svg' alt='edit' />
							</div>
							<div
								onClick={() => {
									setActivity(true)
									setModalContent(
										<FormGoodDelete
											good={data}
											setModalContent={setModalContent}
										/>
									)
								}}
							>
								<img src='/icons/delete.svg' alt='delete' />
							</div>
						</div>
					</>
				) : (
					<>
						<div className={styles.sellerName}>
							<img src='/icons/seller.svg' alt='seller' />
							<p>
								{data.people.SURNAME} {data.people.NAME}{' '}
								{data.people.PARENT_NAME}
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default GoodCard
