import styles from './Field.module.scss'

const Field = ({ register, name, value, options, error, ...rest }) => {
	return (
		<div className={styles.input}>
			<input
				{...register(name, options)}
				{...rest}
				className={styles.input}
				value={value}
			/>
			{error && <div className={styles.error}>{error}</div>}
		</div>
	)
}

export default Field
