import cn from 'clsx'

import Button from '/src/components/ui/button/Button.jsx'
import Field from '/src/components/ui/field/Field.jsx'

import { useGoodFormEdit } from '/src/hooks/useGoodFormEdit'

import styles from './FormGoodEdit.module.scss'

const FormGoodEdit = ({ good, setModalContent }) => {
	const { errors, handleSubmit, isLoading, onSubmit, register } =
		useGoodFormEdit({
			goodId: good.ID,
			setModalContent: () => {
				setModalContent(
					<div className={cn(styles.form, styles.success)}>
						<p className={styles.titleSuccess}>Товар успешно обновлён!</p>
					</div>
				)
			}
		})

	if (isLoading) {
		return <div>Загрузка...</div>
	}

	return (
		<div className={styles.form}>
			<p className={styles.title}>Изменение фотографии</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					className={styles.disable}
					error={errors?.disable?.message}
					name='disable'
					value={`${good.photo.NAME}, ${good.photo.photo_size.NAME}, ${good.photo.type_paper.NAME}`}
					register={register}
					type='text'
					placeholder='Цена'
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
				<Button size='autoWight'>Изменить</Button>
			</form>
		</div>
	)
}

export default FormGoodEdit
