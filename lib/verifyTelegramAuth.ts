import crypto from 'crypto'

export function verifyTelegramAuth(queryParams: any) {
	const secret = crypto
		.createHash('sha256')
		.update(process.env.BOT_API_TOKEN || '')
		.digest()

	const checkString = Object.keys(queryParams)
		.filter(key => key !== 'hash')
		.sort()
		.map(key => `${key}=${queryParams[key]}`)
		.join('\n')

	const hash = crypto
		.createHmac('sha256', secret)
		.update(checkString)
		.digest('hex')

	return hash === queryParams.hash
}
