import { Link } from 'react-router-dom'

import Button from '/src/components/ui/button/Button'
import Field from '/src/components/ui/field/Field'

import { useAuthData } from '/src/hooks/useAuthData'

import Layout from '/src/components/layout/Layout'

import styles from './Auth.module.scss'

const Auth = () => {
	const { errors, handleSubmit, isLoading, onSubmit, register } = useAuthData(
		{}
	)

	return (
		<Layout seoKey='auth'>
			<div className={styles.wrapperAuth}>
				<div className={styles.wrapperInner}>
					<div>
						<p className={styles.headline}>Авторизация</p>
						<h1>Войдите в личный кабинет</h1>

						<form onSubmit={handleSubmit(onSubmit)}>
							<Field
								error={errors?.email?.message}
								name='email'
								register={register}
								options={{
									required: 'Введите почту'
								}}
								type='email'
								placeholder='Email'
							/>
							<Field
								error={errors?.password?.message}
								name='password'
								register={register}
								options={{
									required: 'Введите пароль'
								}}
								type='password'
								placeholder='Пароль'
							/>
							<Button size='autoWight'>Войти</Button>
						</form>

						<div className={styles.additional}>
							<Link to='/auth/user'>Регистрация клиентов</Link>
							<Link to='/auth/organization'>Регистрация фотографов</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Auth
