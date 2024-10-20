import { NextResponse } from 'next/server'
import dbConnect from '@@/lib/mongodb'
import Marker from '@@/models/MarkerModel'
import UserModel from '@@/models/UserModel'
import { auth } from '@@/lib/auth'

// POST: добавление новой метки
export async function POST(req: Request) {
	try {
		await dbConnect()

		const session = await auth()
		if (!session) {
			return NextResponse.json(
				{ message: 'Необходима авторизация' },
				{ status: 401 }
			)
		}

		const body = await req.json()
		const { type, location, source, comment } = body

		if (!type || !location || !source) {
			return NextResponse.json(
				{ message: 'Все поля обязательны' },
				{ status: 400 }
			)
		}

		const user = await UserModel.findById(session.user.id)

		if (!user) {
			return NextResponse.json(
				{ message: 'Пользователь не найден' },
				{ status: 404 }
			)
		}

		const newMarker = await Marker.create({
			user: user._id,
			type,
			address: location,
			label: source,
			description: comment
		})

		user.markers.push(newMarker._id)
		await user.save()

		return NextResponse.json(
			{ message: 'Метка успешно добавлена', marker: newMarker },
			{ status: 201 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ message: 'Ошибка при добавлении метки', error },
			{ status: 500 }
		)
	}
}

// GET: получение всех меток
export async function GET() {
	try {
		await dbConnect()

		const markers = await Marker.find()

		return NextResponse.json({ markers }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ message: 'Ошибка при получении меток', error },
			{ status: 500 }
		)
	}
}