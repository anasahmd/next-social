'use client';
import React, { useState } from 'react';
import Avatar from './Avatar';
import { useSession } from 'next-auth/react';

const PostForm = ({ fetchPosts }) => {
	const { data: session, status } = useSession();
	const [text, setText] = useState('');

	const submitHandler = async (e) => {
		e.preventDefault();

		let data = await fetch('/api/post', {
			method: 'POST',
			body: JSON.stringify({ text }),
			headers: { 'content-type': 'application/json' },
		});
		setText('');
		fetchPosts();
	};

	return (
		<div className="mt-10 bg-white max-w-[30rem] w-11/12 rounded-xl flex shadow-sm ">
			<form
				action=""
				className="flex flex-col divide-y divide-slate-200 w-full"
				onSubmit={submitHandler}
			>
				<label htmlFor="text" className="p-4 font-semibold text-slate-800">
					Post Something
				</label>
				<div className="flex p-4 gap-4  items-start">
					{session && (
						<div className="w-10">
							<Avatar
								username={session.user.username}
								image={session.user.image}
								size={56}
							/>
						</div>
					)}

					<textarea
						type="text"
						id="text"
						placeholder="What's on your mind?"
						className="textarea textarea-ghost w-full px-2 text-base focus:outline-none"
						rows={3}
						value={text}
						onChange={(e) => {
							setText(e.target.value);
						}}
					></textarea>
				</div>
				<div className="px-4 py-4 flex justify-end">
					<button
						type="submit"
						className="btn hover:bg-blue-600 bg-blue-500 text-white rounded-xl py-3 h-full text-center px-4 btn-sm"
					>
						Post
					</button>
				</div>
			</form>
		</div>
	);
};

export default PostForm;
