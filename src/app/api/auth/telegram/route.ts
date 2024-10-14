import { NextResponse } from 'next/server'
import User from '@@/models/user'
import dbConnect from '@@/lib/mongodb'
import { verifyTelegramAuth } from '@@/lib/verifyTelegramAuth'

export async function GET(req: Request) {
	const url = new URL(req.url)
	const queryParams = Object.fromEntries(url.searchParams.entries())

	// Верификация данных, отправленных Telegram
	const isValid = verifyTelegramAuth(queryParams)

	if (!isValid) {
		return NextResponse.json(
			{ message: 'Не удалось подтвердить Telegram данные' },
			{ status: 400 }
		)
	}

	// Подключение к базе данных
	await dbConnect()

	// Поиск пользователя по Telegram ID
	let user = await User.findOne({ telegramId: queryParams.id })

	// Если пользователь не найден, создаем нового пользователя
	if (!user) {
		user = await User.create({
			name: queryParams.first_name,
			telegramId: queryParams.id,
			provider: 'telegram'
		})
	}

	// Создание сессии для пользователя
	return NextResponse.redirect('/') // Указываешь страницу, куда перенаправить после входа
}
