import './globals.css'
import NavBar from '@/components/NavBar'
import ProviderWrapper from '@/components/ProviderWrapper'
import '@mantine/core/styles.css'
import MantineWrapper from '@/components/MantineWrapper'

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
			<head></head>
			<body className='bg-gray-950 text-white'>
				<MantineWrapper>
					<ProviderWrapper>
						<NavBar />
						{children}
					</ProviderWrapper>
				</MantineWrapper>
			</body>
		</html>
	)
}
