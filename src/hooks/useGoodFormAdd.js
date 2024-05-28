import GoodService from '/src/services/good.service'
import photoService from '/src/services/photo.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const useGoodFormAdd = ({ setModalContent, children }) => {
	const queryClient = useQueryClient()

	const photoData = useQuery({
		queryKey: ['photo'],
		queryFn: () => photoService.getList()
	})

	const [photoList, isPhotoLoading] = [photoData.data, photoData.isLoading]

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
			params.photoId = params.photoId.value
			GoodService.add(params)
		},
		onSuccess: () => {
			console.log('success')
			queryClient.invalidateQueries(['profile', 'photo', 'photoSeller'])
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
			control,
			isLoading,
			onSubmit,
			photoList,
			isPhotoLoading
		}),
		[errors, isLoading, isPhotoLoading]
	)
}
