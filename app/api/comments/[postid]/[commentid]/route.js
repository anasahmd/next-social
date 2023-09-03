import Connect from '@/app/db/dbConnect';
import Post from '@/app/models/Post';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Comment from '@/app/models/Comment';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';

export const DELETE = async (req, { params }) => {
	Connect();
	const { commentid, postid } = params;

	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json(
			{ error: 'You are not logged in!' },
			{ status: 401 }
		);
	}

	const post = await Post.findById(postid);

	if (!post) {
		return NextResponse.json({ error: 'Post not found!' }, { status: 404 });
	}

	const comment = await Comment.findById(commentid);

	if (!comment) {
		return NextResponse.json({ error: 'Comment not found!' }, { status: 404 });
	}

	try {
		await Post.findByIdAndUpdate(postid, { $pull: { comments: commentid } });
		await Comment.findByIdAndDelete(commentid);

		return NextResponse.json(post);
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
};
