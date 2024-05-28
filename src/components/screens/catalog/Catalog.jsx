import { useState } from 'react'
import ReactSelect from 'react-select'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import Loader from '/src/components/ui/Loader'
import GoodCard from '/src/components/ui/card/good/GoodCard'
import Empty from '/src/components/ui/empty/Empty'
import FormOrderAdd from '/src/components/ui/form/order/add/FormOrderAdd'
import Modal from '/src/components/ui/modal/Modal'
import NextButton from '/src/components/ui/slider/buttons/Next/NextButton'
import PrevButton from '/src/components/ui/slider/buttons/Prev/PrevButton'

import { useCatalog } from '/src/hooks/useCatalog'

import Layout from '/src/components/layout/Layout'

import styles from './Catalog.module.scss'

const Catalog = () => {
	const [sellerList, setSellerList] = useState([])
	const [photoSizeList, setPhotoSizeList] = useState([])
	const [typePaperList, setTypePaperList] = useState([])

	const [active, setActivity] = useState(false)
	const [modalContent, setModalContent] = useState()

	const {
		data,
		isLoading,
		setSellerFilter,
		setPhotoSizeFilter,
		setTypePaperFilter
	} = useCatalog()

	if (isLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	const tmpArray = []

	if (sellerList.length === 0) {
		data.forEach(good => {
			if (!tmpArray.some(o => o.ID === good.people.ID))
				tmpArray.push(good.people)
		})
		setSellerList(tmpArray.slice(0))
		tmpArray.length = 0
	}

	if (photoSizeList.length === 0) {
		data.forEach(good => {
			if (!tmpArray.some(o => o.ID === good.photo.photo_size.ID))
				tmpArray.push(good.photo.photo_size)
		})
		setPhotoSizeList(tmpArray.slice(0))
		tmpArray.length = 0
	}

	if (typePaperList.length === 0) {
		data.forEach(good => {
			if (!tmpArray.some(o => o.ID === good.photo.type_paper.ID))
				tmpArray.push(good.photo.type_paper)
		})
		setTypePaperList(tmpArray.slice(0))
	}

	const settings = {
		className: 'center',
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		padding: '60px',
		slidesToScroll: 1,
		adaptiveHeight: true,
		nextArrow: <NextButton />,
		prevArrow: <PrevButton />
	}

	const selectStyles = {
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? '#ffb47d47 ' : '#7d9dff',
			fontSize: '14px',
			cursor: 'pointer'
		})
	}

	return (
		<Layout seoKey='catalog'>
			<Modal active={active} setActivity={setActivity}>
				{modalContent}
			</Modal>
			<main className={styles.main}>
				<div className={styles.wrapperInner}>
					<div className={styles.head}>
						<p className={styles.headline}>Фотографы FOPUS</p>
						<h1>Найди фотографа для себя</h1>
					</div>

					<div className={styles.filters}>
						<ReactSelect
							classNamePrefix='select'
							placeholder='Фотограф'
							title='Фотограф'
							styles={selectStyles}
							noOptionsMessage={({ inputValue }) =>
								!inputValue ? '' : 'Нет подходящих фотографов'
							}
							options={[
								{ value: -1, label: 'Все' },
								...sellerList.map(seller => ({
									value: seller.ID,
									label: `${seller.SURNAME} ${seller.NAME} ${seller.PARENT_NAME}`
								}))
							]}
							onChange={selectedOption => setSellerFilter(selectedOption.value)}
						/>
						<ReactSelect
							classNamePrefix='select'
							placeholder='Размер фотографии'
							title='Размер фотографии'
							styles={selectStyles}
							noOptionsMessage={({ inputValue }) =>
								!inputValue ? '' : 'Нет подходящих размеров фотографии'
							}
							options={[
								{ value: -1, label: 'Все' },
								...photoSizeList.map(photoSize => ({
									value: photoSize.ID,
									label: `${photoSize.NAME}`
								}))
							]}
							onChange={selectedOption =>
								setPhotoSizeFilter(selectedOption.value)
							}
						/>
						<ReactSelect
							classNamePrefix='select'
							placeholder='Тип бумаги'
							title='Тип бумаги'
							styles={selectStyles}
							noOptionsMessage={({ inputValue }) =>
								!inputValue ? '' : 'Нет подходящих типов бумаги'
							}
							options={[
								{ value: -1, label: 'Все' },
								...typePaperList.map(typePaper => ({
									value: typePaper.ID,
									label: `${typePaper.NAME}`
								}))
							]}
							onChange={selectedOption =>
								setTypePaperFilter(selectedOption.value)
							}
						/>
					</div>

					<div className={styles.catalog}>
						{data.length > 0 ? (
							<div className='slider-container'>
								<Slider {...settings}>
									{data.map(good => (
										<GoodCard
											data={good}
											key={good.ID}
											type='catalog'
											clickHandler={() => {
												setActivity(true)
												setModalContent(
													<FormOrderAdd
														good={good}
														setModalContent={setModalContent}
													/>
												)
											}}
										/>
									))}
								</Slider>
							</div>
						) : (
							<Empty className={styles.empty}> Ничего не найдено</Empty>
						)}
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default Catalog
