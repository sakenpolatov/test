'use client'

import { useEffect } from 'react'

const TelegramWidget = () => {
	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://telegram.org/js/telegram-widget.js?22'
		script.async = true
		script.setAttribute('data-telegram-login', 'NextTelegramAuth_bot')
		script.setAttribute('data-size', 'large')
		script.setAttribute('data-userpic', 'false')
		script.setAttribute(
			'data-auth-url',
			`${process.env.NEXTAUTH_URL}/api/auth/telegram`
		)
		script.setAttribute('data-request-access', 'write')
		document.getElementById('telegram-login-btn')?.appendChild(script)
	}, [])

	return <div id='telegram-login-btn'></div>
}
console.log(process.env.NEXTAUTH_URL)
console.log(process.env.MONGODB_URI)

export default TelegramWidget