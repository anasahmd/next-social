import Connect from '@/app/db/dbConnect';
import Post from '@/app/models/Post';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
	Connect();
	const { postid } = params;
	let data;
	try {
		data = await Post.findById(postid)
			.populate({ path: 'user', select: ['username'] })
			.populate({
				path: 'comments',
				populate: { path: 'user', select: ['username'] },
			})
			.populate({
				path: 'likes',
			});
		return NextResponse.json({ data });
	} catch (e) {
		return NextResponse.json({ msg: e.msg });
	}
};
