import UserService from '/src/services/user.service.js'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useProfile = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => UserService.getProfile()
	})

	let { user, goods, orders } = {}

	let amountNewOrder = 0
	let amountOrder = 0

	if (!isLoading) {
		user = data.user
		goods = []
		data.goods.forEach(good => {
			if (good.IS_ACTIVE) goods.push(good)
		})
		orders = data.orders

		data.orders.forEach(item => {
			item.order_status.ID === 1 ? amountNewOrder++ : ''
			item.order_status.ID > 1 ? amountOrder++ : ''
		})
	}

	return useMemo(
		() => ({
			user,
			goods,
			orders,
			amountNewOrder,
			isLoading,
			amountOrder
		}),
		[isLoading, goods, orders]
	)
}
