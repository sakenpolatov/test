import { NextRequest, NextResponse } from 'next/server'
import User from '@@/models/user'
import { verifyTelegramAuth } from '@@/lib/verifyTelegramAuth'
import dbConnect from '@@/lib/mongodb'

export async function GET(req: NextRequest) {
	try {
		const url = new URL(req.url)
		const queryParams = Object.fromEntries(url.searchParams.entries())

		// Верификация данных от Telegram
		const isValid = verifyTelegramAuth(queryParams)

		if (!isValid) {
			return NextResponse.json(
				{ message: 'Ошибка при проверке данных от Telegram' },
				{ status: 400 }
			)
		}

		// Подключаемся к MongoDB
		await dbConnect()

		// Проверяем наличие пользователя с этим telegramId
		let user = await User.findOne({ telegramId: queryParams.id })

		// Если пользователя нет, создаем его
		if (!user) {
			user = new User({
				name: queryParams.first_name,
				telegramId: queryParams.id,
				provider: 'telegram'
			})
			await user.save()
		}

		// Возвращаем успешный ответ
		return NextResponse.json({
			message: 'Авторизация через Telegram успешна',
			user
		})
	} catch (error) {
		return NextResponse.json(
			{ message: 'Произошла ошибка при аутентификации через Telegram', error },
			{ status: 500 }
		)
	}
}
