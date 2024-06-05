import FeedbackService from '/src/services/feedback.service'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const useFeedback = ({ setIsSuccess, handlerErrorForm }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset
	} = useForm({
		mode: 'onChange'
	})

	const { mutate, isLoading } = useMutation({
		queryKey: ['feedback'],
		mutationFn: params => FeedbackService.add(params),
		onSuccess: () => {
			reset()
			setIsSuccess(true)
			handlerErrorForm('')
			setTimeout(() => document.location.reload(), 500)
		},
		onError: e => {
			console.log(e)
			setIsSuccess(false)
			handlerErrorForm(e.message)
		}
	})

	const onSubmit = data => {
		if (!data.orderId) {
			handlerErrorForm('Необходимо выбрать заказ')
			return
		}
		data.orderId = data.orderId.value

		mutate(data)
	}

	return useMemo(
		() => ({
			register,
			handleSubmit,
			errors,
			control,
			isLoading,
			onSubmit
		}),
		[errors, isLoading]
	)
}
