import AuthService from '/src/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuth } from './useAuth'

export const useAuthData = ({ type = 'login', roleId = null }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		mode: 'onChange'
	})

	const { isAuth, setIsAuth } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuth) {
			document.location = '/profile'
		}
	}, [isAuth, navigate])

	const { mutate, isLoading } = useMutation({
		queryKey: ['auth'],
		mutationFn: params => AuthService.main(params, type),
		onSuccess: () => {
			setIsAuth(true)
			reset()
		},
		onError: e => {
			console.log(e)
		}
	})

	const onSubmit = data => {
		if (type === 'register') data['roleId'] = roleId
		mutate(data)
	}

	return useMemo(
		() => ({
			register,
			handleSubmit,
			errors,
			isLoading,
			onSubmit
		}),
		[errors, isLoading]
	)
}
