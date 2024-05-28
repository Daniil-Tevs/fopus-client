import orderService from '/src/services/order.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useProfileUser = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['orders'],
		queryFn: () => orderService.getOrders()
	})

	return useMemo(
		() => ({
			data,
			isLoading
		}),
		[data, isLoading]
	)
}
