import User from '@/app/models/User';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
	const { username } = params;
	try {
		const user = await User.findOne({ username }).select('-password');
		if (!user) {
			throw new Error('No user found');
		}
		return NextResponse.json({ message: 'User found', user });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 404 });
	}
};
