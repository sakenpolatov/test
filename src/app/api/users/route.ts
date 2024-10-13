import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/mongodb'
import User from '../../../../models/user'

export async function GET() {
	try {
		await dbConnect()
		const users = await User.find()
		return NextResponse.json({ users }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error fetching users', error },
			{ status: 500 }
		)
	}
}

export async function POST(req: Request) {
	try {
		await dbConnect()
		const body = await req.json()
		const { name, email, password } = body

		if (!name || !email || !password) {
			return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
		}

		const newUser = await User.create({ name, email, password })
		return NextResponse.json(
			{ message: 'User created successfully', newUser },
			{ status: 201 }
		)
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error creating user', error },
			{ status: 500 }
		)
	}
}
