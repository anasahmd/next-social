import Connect from '@/app/db/dbConnect';
import Post from '@/app/models/Post';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';
import User from '@/app/models/User';

export const GET = async (req, { params }) => {
	Connect();
	const { postid } = params;
	let data;
	try {
		data = await Post.findById(postid)
			.populate({ path: 'user', select: ['username', 'dp'] })
			.populate({
				path: 'comments',
				populate: { path: 'user', select: ['username', 'dp'] },
				options: { sort: { createdAt: -1 } },
			});
		return NextResponse.json({ data });
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
};

export const PUT = async (req, { params }) => {
	Connect();
	const { postid } = params;
	const { text } = await req.json();

	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({ error: 'You are not logged in!' });
	}

	const post = await Post.findById(postid);

	if (!post) {
		return NextResponse.json({ error: 'Post not found!' }, { status: 400 });
	}

	if (!post.user.equals(session.user.id)) {
		return NextResponse.json(
			{ error: 'You are not allowed to do that!' },
			{ status: 400 }
		);
	}
	let data;
	try {
		data = await Post.findByIdAndUpdate(postid, { text, edited: true });
		return NextResponse.json({ data });
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
};

export const DELETE = async (req, { params }) => {
	Connect();
	const { postid } = params;

	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({ error: 'You are not logged in!' });
	}

	const post = await Post.findById(postid);

	if (!post) {
		return NextResponse.json({ error: 'Post not found!' }, { status: 400 });
	}

	if (!post.user.equals(session.user.id)) {
		return NextResponse.json(
			{ error: 'You are not allowed to do that!' },
			{ status: 400 }
		);
	}
	let data;
	try {
		await User.findByIdAndUpdate(session.user.id, { $pull: { posts: postid } });
		data = await Post.findByIdAndDelete(postid);
		return NextResponse.json({ data });
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
};
