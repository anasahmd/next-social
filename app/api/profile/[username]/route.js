import User from '@/app/models/User';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';

export const GET = async (req, { params }) => {
	const { username } = params;
	try {
		const user = await User.findOne({ username })
			.populate({ path: 'posts', populate: { path: 'user' } })
			.select('-password');
		if (!user) {
			throw new Error('No user found');
		}
		return NextResponse.json({ message: 'User found', user });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 404 });
	}
};

export const PUT = async (req, { params }) => {
	const { username } = params;

	const { bio } = await req.json();

	try {
		const user = await User.findOne({ username });

		if (!user) {
			throw new Error('No user found');
		}

		const session = await getServerSession(authOptions);

		if (!session) {
			throw new Error('You are not logged in!');
		}

		if (!user._id.equals(session.user.id)) {
			throw new Error('You are not allowed to do that!');
		}

		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{
				bio,
			},
			{ runValidators: true }
		);

		return NextResponse.json({ message: 'User updated', updatedUser });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
};
