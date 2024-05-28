import catalogService from '/src/services/catalog.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

export const useCatalog = () => {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryKey: ['goodsCatalog'],
		queryFn: () => catalogService.getGoods(filters)
	})

	const filters = {}
	const [sellerFilter, setSellerFilter] = useState()
	const [photoSizeFilter, setPhotoSizeFilter] = useState()
	const [typePaperFilter, setTypePaperFilter] = useState()

	if (sellerFilter && sellerFilter > 0) filters.seller = sellerFilter

	if (photoSizeFilter && photoSizeFilter > 0)
		filters.photoSize = photoSizeFilter

	if (typePaperFilter && typePaperFilter > 0)
		filters.typePaper = typePaperFilter

	// if (Object.keys(filters).length > 0)
	setTimeout(() => queryClient.invalidateQueries(['goodsCatalog']), 100)

	console.log(filters)
	return useMemo(
		() => ({
			data,
			isLoading,
			setSellerFilter,
			setPhotoSizeFilter,
			setTypePaperFilter
		}),
		[isLoading, data, sellerFilter, photoSizeFilter, typePaperFilter]
	)
}
