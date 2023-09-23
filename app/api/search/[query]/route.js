import User from '@/app/models/User';
import { NextResponse } from 'next/server';
import Connect from '@/app/db/dbConnect';

export const GET = async (req, { params }) => {
	Connect();
	const { query } = params;
	try {
		const users = await User.find({
			username: { $regex: '^' + query, $options: 'i' },
		}).select(['username', 'dp']);

		return NextResponse.json({ message: 'User found', users });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 404 });
	}
};
