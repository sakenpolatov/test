import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import NavBar from '@/components/NavBar'
import ProviderWrapper from '@/components/ProviderWrapper'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

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
			<head>
				<ColorSchemeScript defaultColorScheme='auto' />
			</head>
			<body className='bg-gray-950 text-white'>
				<MantineProvider>
					<ProviderWrapper>
						<NavBar />
						{children}
						<Toaster position='top-right' />
					</ProviderWrapper>
				</MantineProvider>
			</body>
		</html>
	)
}
