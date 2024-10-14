import { NextRequest, NextResponse } from 'next/server'
import User from '@@/models/user'
import { verifyTelegramAuth } from '@@/lib/verifyTelegramAuth'
import dbConnect from '@@/lib/mongodb'

export async function GET(req: NextRequest) {
	try {
		console.log('Получен запрос от Telegram')

		const url = new URL(req.url)
		const queryParams = Object.fromEntries(url.searchParams.entries())

		console.log('Параметры запроса: ', queryParams)

		// Верификация данных от Telegram
		const isValid = verifyTelegramAuth(queryParams)

		if (!isValid) {
			console.log('Ошибка в верификации данных Telegram')
			return NextResponse.json(
				{ message: 'Ошибка при проверке данных от Telegram' },
				{ status: 400 }
			)
		}

		console.log('Данные Telegram прошли верификацию')

		// Подключаемся к MongoDB
		await dbConnect()
		console.log('Подключение к MongoDB успешно')

		// Проверяем наличие пользователя с этим telegramId
		let user = await User.findOne({ telegramId: queryParams.id })
		console.log('Проверка наличия пользователя в базе данных')

		// Если пользователя нет, создаем его
		if (!user) {
			console.log('Создание нового пользователя')
			user = new User({
				name: queryParams.first_name,
				telegramId: queryParams.id,
				provider: 'telegram'
			})
			await user.save()
			console.log('Пользователь создан и сохранен')
		} else {
			console.log('Пользователь уже существует')
		}

		// Возвращаем успешный ответ
		return NextResponse.json({
			message: 'Авторизация через Telegram успешна',
			user
		})
	} catch (error) {
		console.error('Ошибка при авторизации: ', error)
		return NextResponse.json(
			{ message: 'Произошла ошибка при аутентификации через Telegram', error },
			{ status: 500 }
		)
	}
}
