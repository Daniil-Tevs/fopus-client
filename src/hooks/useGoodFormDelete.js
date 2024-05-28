import GoodService from '/src/services/good.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const useGoodFormDelete = ({ goodId, setModalContent }) => {
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
		queryKey: ['deleteGood'],
		mutationFn: params => {
			GoodService.delete(goodId)
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
