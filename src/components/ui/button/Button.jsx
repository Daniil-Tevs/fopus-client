import cn from 'clsx'

import styles from './Button.module.scss'

const Button = ({
	children,
	clickHandler = () => {},
	type = 'main',
	size = 'xs'
}) => {
	return (
		<button
			onClick={clickHandler}
			className={cn(styles.button, styles[type], styles[size])}
		>
			{children}
		</button>
	)
}

export default Button
