import cn from 'clsx'
import { ru } from 'date-fns/locale'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { FaRegCalendar } from 'react-icons/fa'
import ReactSelect from 'react-select'

import Button from '/src/components/ui/button/Button.jsx'
import Field from '/src/components/ui/field/Field.jsx'

import { useFormOrderAdd } from '/src/hooks/useFormOrderAdd'

import styles from './FormOrderAdd.module.scss'

const FormOrderAdd = ({ good, setModalContent }) => {
	const [startDate, setStartDate] = useState(new Date())
	const {
		errors,
		handleSubmit,
		isLoading,
		onSubmit,
		register,
		control,
		typeSpeedList,
		isTypeSpeedLoading
	} = useFormOrderAdd({
		good: good,
		date: startDate,
		setModalContent: () => {
			setModalContent(
				<div className={cn(styles.form, styles.success)}>
					<p className={styles.titleSuccess}>
						<p>Заказ успешно добавлен! </p>
						<span>Продавец скоро с вами свяжется</span>
					</p>
				</div>
			)
		}
	})

	if (isLoading || isTypeSpeedLoading) {
		return <div>Загрузка...</div>
	}

	return (
		<div className={styles.form}>
			<p className={styles.title}>Запись на фотографирование</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					error={errors?.disablePhoto?.message}
					name='disablePhoto'
					value={`Фото: ${good.photo.NAME}, ${good.photo.photo_size.NAME}, ${good.photo.type_paper.NAME}`}
					register={register}
					type='text'
					placeholder='Фотография'
				/>
				<Field
					error={errors?.disableCost?.message}
					name='disableCost'
					value={`Цена: ${good.COST}`}
					register={register}
					type='text'
					placeholder='Цена'
				/>
				<Field
					error={errors?.disable?.message}
					name='disableSeller'
					value={`Продавец: ${good.people.SURNAME} ${good.people.NAME} ${good.people.PARENT_NAME}`}
					register={register}
					type='text'
					placeholder='Цена'
				/>

				<hr />

				<div className={styles.datePicker}>
					<DatePicker
						showIcon
						selected={startDate}
						onChange={date => setStartDate(date)}
						icon={
							<div className={styles.calendarIcon}>
								<FaRegCalendar />
							</div>
						}
						locale={ru}
						minDate={new Date()}
						dateFormat='yyyy-MM-dd'
					/>
				</div>

				<div className={styles.select}>
					<Controller
						className={styles.select}
						name='typeSpeedOrder'
						control={control}
						render={({ field: { value, onChange } }) => {
							return (
								<ReactSelect
									classNamePrefix='select2-selection'
									placeholder='Скорость заказа'
									title='Скорость заказа'
									noOptionsMessage={({ inputValue }) =>
										!inputValue ? '' : 'Нет подходящих типов скорости заказа'
									}
									options={typeSpeedList.map(typeSpeed => ({
										value: typeSpeed.ID,
										label: typeSpeed.NAME
									}))}
									value={value}
									onChange={onChange}
								/>
							)
						}}
					/>
				</div>

				<Field
					error={errors?.amount?.message}
					name='amount'
					register={register}
					options={{
						required: 'Введите количество'
					}}
					type='nu,ber'
					placeholder='Количество фотографий'
				/>
				<Button size='autoWight'>Записаться</Button>
			</form>
		</div>
	)
}

export default FormOrderAdd
