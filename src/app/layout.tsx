import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import { ThemeProvider } from '@@/components/ThemeProvider'
import NavBar from '@/components/NavBar'
import ProviderWrapper from '@/components/ProviderWrapper'

export const metadata = {
	title: 'TelegramWebApp',
	description: 'auth mongodb telegram',
	icons: {
		icon: '/favicon.svg'
	}
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange
				>
					<ProviderWrapper>
						<NavBar />
						{children}
						<Toaster position='top-right' />
					</ProviderWrapper>
				</ThemeProvider>
			</body>
		</html>
	)
}
