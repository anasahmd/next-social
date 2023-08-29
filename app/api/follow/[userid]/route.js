import Connect from '@/app/db/dbConnect';
import { getServerSession } from 'next-auth';
import authOptions from '../../auth/[...nextauth]/authOptions';
import { NextResponse } from 'next/server';
import User from '@/app/models/User';

export const POST = async (req, { params }) => {
	Connect();
	const { userid } = params;

	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json(
			{ error: 'You are not logged in!' },
			{ status: 401 }
		);
	}

	const user = await User.findById(userid);
	const sessionUser = await User.findById(session.user.id);

	if (!user) {
		return NextResponse.json({ error: 'User not found!' }, { status: 404 });
	}

	try {
		if (user.followers.includes(session.user?.id)) {
			await User.findByIdAndUpdate(userid, {
				$pull: { followers: session.user.id },
			});
			await User.findByIdAndUpdate(session.user?.id, {
				$pull: { following: user._id },
			});
		} else {
			user.followers.push(session.user.id);
			sessionUser.following.push(user._id);
			await user.save();
			await sessionUser.save();
		}

		return NextResponse.json({ message: 'Success' });
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
};
