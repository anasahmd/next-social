import Connect from '@/app/db/dbConnect';
import Post from '@/app/models/Post';
import { NextResponse } from 'next/server';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import User from '@/app/models/User';

export const GET = async () => {
	Connect();
	let data;
	try {
		data = await Post.find({})
			.populate({ path: 'user', select: ['username'] })
			.populate({
				path: 'comments',
				populate: { path: 'user', select: ['username'] },
			})
			.populate({
				path: 'likes',
			});
		console.log(data);
		return NextResponse.json({ data });
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
};

export const POST = async (req) => {
	Connect();
	const { text } = await req.json();

	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({ msg: 'You are not logged in!' });
	}

	const user = await User.findById(session.user?.id);

	const post = new Post({
		text,
		user: session.user?.id,
	});

	user.posts.push(post);

	try {
		await post.save();
		await user.save();
		return NextResponse.json(post);
	} catch (e) {
		return NextResponse.json({ e, msg: 'Something went wrong' });
	}
};
