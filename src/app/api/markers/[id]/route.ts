import { NextResponse } from 'next/server'
import dbConnect from '@@/lib/mongodb'
import Marker from '@@/models/MarkerModel'
import UserModel from '@@/models/UserModel'

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	try {
		await dbConnect()

		const marker = await Marker.findById(id)

		if (!marker) {
			return NextResponse.json({ message: 'Метка не найдена' }, { status: 404 })
		}

		await marker.deleteOne()

		await UserModel.updateMany(
			{ markers: marker._id },
			{ $pull: { markers: marker._id } }
		)

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
