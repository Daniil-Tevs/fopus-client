import { seoList } from '/src/seo.constants.js'
import { Helmet } from 'react-helmet'

import Footer from './footer/Footer'
import Header from './header/Header.'

const Layout = ({ seoKey = 'main', children }) => {
	const seoData =
		Object.keys(seoList[seoKey]).length > 0 ? seoList[seoKey] : seoList.main

	return (
		<>
			<Helmet>
				<title>{seoData.title ? seoData.title : ''}</title>
				<meta
					name='description'
					content={seoData.description ? seoData.description : ''}
				/>
				<meta
					name='keywords'
					content={seoData.keywords ? seoData.keywords : ''}
				/>
			</Helmet>
			<Header />
			{children}
			<Footer />
		</>
	)
}

export default Layout
