import OrderService from '/src/services/order.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const useFormOrderAdd = ({ date, good, setModalContent }) => {
	const typeSpeedSource = useQuery({
		queryKey: ['typeSpeedCatalog'],
		queryFn: () => OrderService.getList()
	})

	const typeSpeedList = typeSpeedSource.data,
		isTypeSpeedLoading = typeSpeedSource.isLoading

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset
	} = useForm({
		mode: 'onChange'
	})

	const { mutate, isLoading } = useMutation({
		queryKey: ['addGood'],
		mutationFn: params => {
			OrderService.add(params)
		},
		onSuccess: () => {
			console.log('success')
			reset()
			setModalContent()
		},
		onError: e => {
			console.log(e)
		}
	})

	const onSubmit = data => {
		if (data.amount > 0) {
			const params = {
				amount: data.amount,
				goodId: good.ID,
				typeSpeedOrderId: data.typeSpeedOrder.value,
				date: date.toISOString().split('T')[0]
			}
			mutate(params)
		}
	}

	return useMemo(
		() => ({
			register,
			control,
			handleSubmit,
			errors,
			isLoading,
			onSubmit,
			typeSpeedList,
			isTypeSpeedLoading
		}),
		[errors, isLoading, isTypeSpeedLoading]
	)
}
