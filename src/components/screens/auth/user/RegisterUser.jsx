import { useState } from 'react'
import { Link } from 'react-router-dom'

import Loader from '/src/components/ui/Loader'
import Button from '/src/components/ui/button/Button'
import Field from '/src/components/ui/field/Field'

import { useAuthData } from '/src/hooks/useAuthData'

import Layout from '/src/components/layout/Layout'

import styles from './RegisterUser.module.scss'

const RegisterUser = () => {
	const [textErrorForm, handlerErrorForm] = useState('')

	const { errors, handleSubmit, isLoading, onSubmit, register } = useAuthData({
		type: 'register',
		roleId: 3,
		handlerErrorForm
	})

	if (isLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	return (
		<Layout seoKey='register'>
			<div className={styles.wrapperAuth}>
				<div className={styles.wrapperInner}>
					<div>
						<p className={styles.headline}>Регистрация Клиентов</p>
						<h1>
							Зарегистрируйся и <span>найди фотографа</span> для любых целей
						</h1>

						<form onSubmit={handleSubmit(onSubmit)}>
							<Field
								error={errors?.surname?.message}
								name='surname'
								register={register}
								options={{
									required: 'Введите вашу фамилию',
									pattern: /^[A-Za-z]+$/i
								}}
								type='text'
								placeholder='Фамилия*'
							/>
							<Field
								error={errors?.name?.message}
								name='name'
								register={register}
								options={{
									required: 'Введите ваше имя',
									pattern: /^[A-Za-z]+$/i
								}}
								type='text'
								placeholder='Имя*'
							/>
							<Field
								error={errors?.parentName?.message}
								name='parentName'
								register={register}
								type='text'
								placeholder='Отчество'
							/>
							<Field
								error={errors?.email?.message}
								name='email'
								register={register}
								options={{
									required: 'Введите почту'
								}}
								type='email'
								placeholder='Email*'
							/>
							<Field
								error={errors?.password?.message}
								name='password'
								register={register}
								options={{
									required: 'Введите пароль',
									minLength: 4
								}}
								type='password'
								placeholder='Пароль*'
							/>
							<Button size='autoWight'>Зарегистрироваться</Button>
							<div className={styles.formError}>{textErrorForm}</div>
						</form>

						<div className={styles.additional}>
							<Link to='/auth'>Уже есть аккаунт? Войти</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default RegisterUser
