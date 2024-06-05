import { useState } from 'react'
import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import Loader from '/src/components/ui/Loader'
import Button from '/src/components/ui/button/Button'
import Field from '/src/components/ui/field/Field'

import { useProfileUser } from '/src/hooks/useProfileUser'

import Layout from '/src/components/layout/Layout'

import styles from './Feedback.module.scss'
import { useFeedback } from './useFeedback'

const Feedback = () => {
	const [isSend, setIsSend] = useState(false)
	const [textErrorForm, handlerErrorForm] = useState('')
	const orders = useProfileUser()

	const { errors, handleSubmit, isLoading, control, onSubmit, register } =
		useFeedback({
			handlerErrorForm,
			setIsSuccess: setIsSend
		})

	if (isLoading || orders.isLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	return (
		<Layout>
			<div className={styles.wrapper}>
				<div className={styles.wrapperInner}>
					<div>
						<h1>Добавить отзыв</h1>

						{isSend ? (
							<div className={styles.successText}>Отзыв добавлен успешно!</div>
						) : (
							''
						)}

						<form onSubmit={handleSubmit(onSubmit)}>
							<div className={styles.select}>
								<Controller
									name='orderId'
									control={control}
									render={({ field: { value, onChange } }) => {
										return (
											<ReactSelect
												classNamePrefix='select2-selection'
												placeholder='Выберите заказ'
												title='Заказ'
												noOptionsMessage={({ inputValue }) =>
													!inputValue ? 'Нет подходящего заказа' : 'Нет'
												}
												options={orders.data.map(order => ({
													value: order.ID,
													label: `#${order.ID}, ${order.photo.NAME}, ${order.AMOUNT_PHOTO} шт., ${order.DATA_CREATED.split('T')[0]}`
												}))}
												value={value}
												onChange={onChange}
											/>
										)
									}}
								/>
							</div>

							<Field
								error={errors?.text?.message}
								name='text'
								register={register}
								options={{
									required: 'Введите отзыв'
								}}
								type='text'
								placeholder='Текст отзыва'
							/>

							<Button size='autoWight'>Добавить</Button>
							<div className={styles.formError}>{textErrorForm}</div>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Feedback
