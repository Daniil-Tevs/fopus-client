import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/styles/index.scss'
import AuthProvider from './providers/AuthProvider'
import UserProvider from './providers/UserProvider'
import Router from './routes/Routes'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<UserProvider>
					<Router />
				</UserProvider>
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>
)
