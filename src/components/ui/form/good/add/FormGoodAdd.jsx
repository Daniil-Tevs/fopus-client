import cn from 'clsx'
import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import Button from '/src/components/ui/button/Button.jsx'
import Field from '/src/components/ui/field/Field.jsx'

import { useGoodFormAdd } from '/src/hooks/useGoodFormAdd'

import styles from './FormGoodAdd.module.scss'

const FormGoodAdd = ({ goods, setModalContent }) => {
	const {
		errors,
		photoList,
		isPhotoLoading,
		control,
		handleSubmit,
		isLoading,
		onSubmit,
		register
	} = useGoodFormAdd({
		setModalContent: () => {
			setModalContent(
				<div className={cn(styles.form, styles.success)}>
					<p className={styles.titleSuccess}>Товар успешно добавлен!</p>
				</div>
			)
		}
	})

	if (isPhotoLoading || isLoading) {
		return <div>Загрузка...</div>
	}

	const photoActualList = []

	const photoSellerPhotoList = goods.map(good => {
		if (good.IS_ACTIVE) return good.photo.ID
	})

	photoList.forEach(photo => {
		if (!photoSellerPhotoList.includes(photo.ID)) photoActualList.push(photo)
	})

	return (
		<div className={styles.form}>
			<p className={styles.title}>Добавление фотографии</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					className={styles.select}
					name='photoId'
					control={control}
					render={({ field: { value, onChange } }) => {
						return (
							<ReactSelect
								classNamePrefix='select2-selection'
								placeholder='Выберите фотографию'
								title='Фотография'
								noOptionsMessage={({ inputValue }) =>
									!inputValue ? 'Уже использованы все фотографии' : 'Нет'
								}
								options={photoActualList.map(photo => ({
									value: photo.ID,
									label: `${photo.NAME}, ${photo.photo_size.NAME}, ${photo.type_paper.NAME}`
								}))}
								value={value}
								onChange={onChange}
							/>
						)
					}}
				/>
				<Field
					error={errors?.cost?.message}
					name='cost'
					register={register}
					options={{
						required: 'Введите цену'
					}}
					type='number'
					placeholder='Цена'
				/>
				<Button size='autoWight'>Добавить</Button>
			</form>
		</div>
	)
}

export default FormGoodAdd
