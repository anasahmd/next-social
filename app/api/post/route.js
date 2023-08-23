import Connect from '@/app/db/dbConnect';
import Post from '@/app/models/Post';
import { NextResponse } from 'next/server';

export const GET = async () => {
	Connect();
	let data;
	try {
		data = await Post.find({});
		return NextResponse.json({ data });
	} catch (e) {
		return NextResponse.json({ msg: e.msg });
	}
};

export const POST = async (req) => {
	Connect();
	let { text } = await req.json();

	let data = new Post({
		text,
	});

	try {
		await data.save();
		return NextResponse.json({ data, msg: 'Conent created successfully' });
	} catch (e) {
		return NextResponse.json({ e, msg: 'Something went wrong' });
	}
};
