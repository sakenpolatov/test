import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import { ThemeProvider } from '@@/components/ThemeProvider'
import NavBar from '@@/components/NavBar' // Импортируем NavBar

export const metadata = {
	title: 'TelegramWebApp',
	description: 'auth mongodb telegram'
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
					<NavBar />
					{children}
					<Toaster position='top-right' />
				</ThemeProvider>
			</body>
		</html>
	)
}
