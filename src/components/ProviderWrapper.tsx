'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import store from '@/redux/store'

interface ProviderWrapperProps {
	children: React.ReactNode
}

const ProviderWrapper: React.FC<ProviderWrapperProps> = ({ children }) => {
	return (
		<SessionProvider>
			<Provider store={store}>{children}</Provider>
		</SessionProvider>
	)
}

export default ProviderWrapper
