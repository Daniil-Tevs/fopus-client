import cn from 'clsx'
import { IoMdClose } from 'react-icons/io'

import styles from './Modal.module.scss'

const Modal = ({ active, setActivity, children }) => {
	return (
		<div
			className={cn(styles.modal, active ? styles.active : '')}
			onClick={() => {
				setActivity(false)
			}}
		>
			<div
				className={cn(styles.modalContent, active ? styles.active : '')}
				onClick={e => e.stopPropagation()}
			>
				<div
					className={styles.close}
					onClick={() => {
						setActivity(false)
					}}
				>
					<IoMdClose />
				</div>
				{children}
			</div>
		</div>
	)
}

export default Modal
