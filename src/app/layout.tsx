import './globals.css'

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
			<body>{children}</body>
		</html>
	)
}
