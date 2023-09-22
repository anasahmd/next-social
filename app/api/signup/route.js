import Connect from '@/app/db/dbConnect';
import { NextResponse } from 'next/server';
import { genSalt, hash } from 'bcrypt';
import User from '@/app/models/User';
import userSchema from '@/app/schemas/userSchema';

export const POST = async (req) => {
	Connect();
	try {
		const data = await req.json();
		const { fullName, email, password, username } = data;

		const emailUser = await User.findOne({ email });

		if (emailUser) {
			return NextResponse.json(
				{ error: 'Email already exists!' },
				{ status: 409 }
			);
		}

		const validateUser = await userSchema.validateAsync({
			fullName,
			email,
			password,
			username,
		});

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
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
};
