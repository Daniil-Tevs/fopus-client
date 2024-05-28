import GoodService from '/src/services/good.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const useGoodFormEdit = ({ goodId, setModalContent, children }) => {
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		mode: 'onChange'
	})

	const { mutate, isLoading } = useMutation({
		queryKey: ['editGood'],
		mutationFn: params => {
			GoodService.edit(goodId, params)
		},
		onSuccess: () => {
			console.log('success')
			queryClient.invalidateQueries(['profile'])
			reset()
			setModalContent()
		},
		onError: e => {
			console.log(e)
		}
	})

	const onSubmit = data => {
		if (data.cost > 0) mutate(data)
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
