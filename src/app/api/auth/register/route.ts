import { NextResponse } from 'next/server'

import User from '@@/models/user'
import dbConnect from '@@/lib/mongodb'

export async function POST(req: Request) {
	try {
		await dbConnect()
		const body = await req.json()
		const { name, email, password } = body

		if (!name || !email || !password) {
			return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
		}

		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return NextResponse.json(
				{ message: 'User already exists' },
				{ status: 400 }
			)
		}

		const newUser = await User.create({ name, email, password })
		return NextResponse.json(
			{ message: 'User registered successfully', newUser },
			{ status: 201 }
		)
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error registering user', error },
			{ status: 500 }
		)
	}
}
