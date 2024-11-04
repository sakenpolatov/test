import { NextResponse } from 'next/server'
import dbConnect from '@@/lib/mongodb'
import Marker from '@@/models/MarkerModel'
import UserModel from '@@/models/UserModel'
import { auth } from '@@/lib/auth'

// Добавление новой метки
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
		const { type, address, source, comment, coordinates } = body

		if (!type || !address || !source || !coordinates) {
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
			address,
			label: source,
			description: comment,
			coordinates: {
				latitude: coordinates.latitude,
				longitude: coordinates.longitude
			}
		})

		user.markers.push(newMarker._id)
		await user.save()

		return NextResponse.json(
			{ message: 'Метка успешно добавлена', marker: newMarker },
			{ status: 201 }
		)
	} catch (error) {
		console.error('Ошибка при добавлении метки:', error)
		return NextResponse.json(
			{
				message: 'Ошибка при добавлении метки',
				error: (error as { message?: string }).message || 'Неизвестная ошибка'
			},
			{ status: 500 }
		)
	}
}

// Получение всех меток
export async function GET(req: Request) {
	try {
		await dbConnect()
		const session = await auth()
		if (!session) {
			return NextResponse.json(
				{ message: 'Необходима авторизация' },
				{ status: 401 }
			)
		}

		const { searchParams } = new URL(req.url)
		const page = parseInt(searchParams.get('page') || '1', 10)
		const limit = parseInt(searchParams.get('limit') || '10', 10)
		const skip = (page - 1) * limit

		const markers = await Marker.find({ user: session.user.id })
			.skip(skip)
			.limit(limit)

		const totalMarkers = await Marker.countDocuments({ user: session.user.id })

		return NextResponse.json(
			{
				markers,
				totalPages: Math.ceil(totalMarkers / limit)
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ message: 'Ошибка при получении меток', error },
			{ status: 500 }
		)
	}
}
