import { NextResponse } from 'next/server'
import User from '@@/models/user' // Убедитесь, что путь правильный
import dbConnect from '@@/lib/mongodb' // Подключаемся к MongoDB

export async function GET(req: Request) {
	try {
		// Подключаемся к базе данных
		await dbConnect()

		// Извлекаем данные из запроса (возможно, они передаются как query параметры)
		const url = new URL(req.url)
		const queryParams = Object.fromEntries(url.searchParams.entries())

		const { id, first_name, last_name, hash, username } = queryParams

		// Проверка, что id и данные Telegram получены
		if (!id || !first_name || !hash) {
			return NextResponse.json(
				{ message: 'Не удалось получить данные из Telegram' },
				{ status: 400 }
			)
		}

		// Проверяем, существует ли пользователь с данным Telegram ID
		let user = await User.findOne({ telegramId: id })

		// Если пользователь не найден, создаем нового пользователя
		if (!user) {
			user = await User.create({
				name: `${first_name} ${last_name || ''}`,
				telegramId: id,
				provider: 'telegram', // Добавляем провайдера telegram
				username: username || null
			})
		} else {
			// Если пользователь существует, обновляем его провайдера, если это необходимо
			if (user.provider !== 'telegram') {
				user.provider = 'telegram'
				await user.save()
			}
		}

		// Возвращаем успешный ответ с информацией о пользователе
		return NextResponse.json({
			message: 'Telegram аутентификация успешна',
			user
		})
	} catch (error) {
		console.error('Ошибка аутентификации через Telegram:', error)
		return NextResponse.json(
			{ message: 'Произошла ошибка при аутентификации через Telegram', error },
			{ status: 500 }
		)
	}
}
