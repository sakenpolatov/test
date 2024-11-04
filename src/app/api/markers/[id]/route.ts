import { NextResponse } from 'next/server'
import dbConnect from '@@/lib/mongodb'
import Marker from '@@/models/MarkerModel'
import { auth } from '@@/lib/auth'

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params
	try {
		await dbConnect()
		const session = await auth()
		if (!session) {
			return NextResponse.json(
				{ message: 'Необходима авторизация' },
				{ status: 401 }
			)
		}

		const marker = await Marker.findById(id)
		if (!marker) {
			return NextResponse.json({ message: 'Метка не найдена' }, { status: 404 })
		}

		if (marker.user.toString() !== session.user.id) {
			return NextResponse.json(
				{ message: 'У вас нет прав для удаления этой метки' },
				{ status: 403 }
			)
		}

		await marker.deleteOne()
		return NextResponse.json(
			{ message: 'Метка успешно удалена' },
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ message: 'Ошибка при удалении метки', error },
			{ status: 500 }
		)
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params
	const data = await req.json()

	try {
		await dbConnect()
		const session = await auth()
		if (!session) {
			return NextResponse.json(
				{ message: 'Необходима авторизация' },
				{ status: 401 }
			)
		}

		const updatedMarker = await Marker.findById(id)
		if (!updatedMarker) {
			return NextResponse.json({ message: 'Метка не найдена' }, { status: 404 })
		}

		if (updatedMarker.user.toString() !== session.user.id) {
			return NextResponse.json(
				{ message: 'У вас нет прав для обновления этой метки' },
				{ status: 403 }
			)
		}
		const marker = await Marker.findByIdAndUpdate(id, data, { new: true })

		return NextResponse.json(
			{ message: 'Метка успешно обновлена', data: marker },
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ message: 'Ошибка при обновлении метки', error },
			{ status: 500 }
		)
	}
}
