import Connect from '@/app/db/dbConnect';
import Post from '@/app/models/Post';
import { getServerSession } from 'next-auth';
import authOptions from '../../auth/[...nextauth]/authOptions';
import { NextResponse } from 'next/server';

export const POST = async (req, { params }) => {
	Connect();
	const { postid } = params;

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

	try {
		if (post.likes.includes(session.user?.id)) {
			await Post.findByIdAndUpdate(postid, {
				$pull: { likes: session.user?.id },
			});
		} else {
			post.likes.push(session.user?.id);
			await post.save();
		}

		return NextResponse.json(post);
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
};
