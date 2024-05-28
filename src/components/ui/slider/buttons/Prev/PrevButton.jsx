import { MdArrowBackIosNew } from 'react-icons/md'

import styles from './PrevButton.module.scss'

const PrevButton = props => {
	const { className, onClick } = props
	return (
		<div className={`${className} ${styles.prevArrow}`} onClick={onClick}>
			<MdArrowBackIosNew />
		</div>
	)
}

export default PrevButton
