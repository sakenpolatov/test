import React, { useEffect } from 'react'

interface TelegramLoginWidgetProps {
	botUsername: string
	dataSize?: 'large' | 'medium' | 'small'
}

const TelegramLoginWidget: React.FC<TelegramLoginWidgetProps> = ({
	botUsername,
	dataSize = 'large'
}) => {
	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://telegram.org/js/telegram-widget.js?22'
		script.async = true
		script.setAttribute('data-telegram-login', botUsername)
		script.setAttribute('data-size', dataSize)
		script.setAttribute(
			'data-auth-url',
			`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/telegram` // Указываем ваш URL
		)
		script.setAttribute('data-request-access', 'write')

		// Встраиваем скрипт в документ
		document.getElementById('telegram-login')?.appendChild(script)
	}, [botUsername, dataSize])

	return <div id='telegram-login' />
}

export default TelegramLoginWidget
