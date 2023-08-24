import Connect from '@/app/db/dbConnect';
import { NextResponse } from 'next/server';
import { genSalt, hash } from 'bcrypt';
import User from '@/app/models/User';

export const POST = async (req) => {
	Connect();
	try {
		const data = await req.json();
		const { fullName, email, password, username } = data;

		const salt = await genSalt(10);

		const hashedPassword = await hash(password, salt);

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
			username,
		});

		const savedUser = await newUser.save();

		return NextResponse.json(savedUser);
	} catch (e) {
		return NextResponse.json(e.message);
	}
};
