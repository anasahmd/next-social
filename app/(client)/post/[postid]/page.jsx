import React from 'react';
import Post from '../../components/Post';

const page = async ({ params }) => {
	const { postid } = params;
	const fetchData = await fetch(`${process.env.APP_URI}/api/post/${postid}`, {
		cache: 'no-store',
	});
	const postData = await fetchData.json();

	return (
		<div className="bg-slate-100 min-h-screen flex flex-col w-full items-center mt-10">
			<Post value={postData.data} showComment={true} />
		</div>
	);
};

export default page;
