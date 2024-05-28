import cn from 'clsx'

import Button from '/src/components/ui/button/Button.jsx'
import Field from '/src/components/ui/field/Field.jsx'

import { useGoodFormDelete } from '/src/hooks/useGoodFormDelete'

import styles from './FormGoodDelete.module.scss'

const FormGoodDelete = ({ good, setModalContent }) => {
	const { errors, handleSubmit, isLoading, onSubmit, register } =
		useGoodFormDelete({
			goodId: good.ID,
			setModalContent: () => {
				setModalContent(
					<div className={cn(styles.form, styles.success)}>
						<p className={styles.titleSuccess}>Товар успешно удален!</p>
					</div>
				)
			}
		})

	if (isLoading) {
		return <div>Загрузка...</div>
	}

	return (
		<div className={styles.form}>
			<p className={styles.title}>Удаление фотографии</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					className={styles.disable}
					name='disable'
					value={`${good.photo.NAME}, ${good.photo.photo_size.NAME}, ${good.photo.type_paper.NAME}`}
					register={register}
					type='text'
				/>
				<Field
					name='disableCost'
					register={register}
					value={good.COST}
					type='text'
				/>
				<Button size='autoWight'>Удалить</Button>
			</form>
		</div>
	)
}

export default FormGoodDelete
