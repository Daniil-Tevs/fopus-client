import { MdArrowForwardIos } from 'react-icons/md'

import styles from './NextButton.module.scss'

const NextButton = props => {
	const { className, onClick } = props
	return (
		<div className={`${className} ${styles.nextArrow}`} onClick={onClick}>
			<MdArrowForwardIos />
		</div>
	)
}

export default NextButton
