'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const PostForm = ({ fetchPosts }) => {
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
		<div className="mt-10 bg-white w-[30rem] rounded-xl flex shadow-sm">
			<form
				action=""
				className="flex flex-col divide-y divide-slate-200 w-full"
				onSubmit={submitHandler}
			>
				<label htmlFor="text" className="p-4 font-semibold text-slate-800">
					Post Something
				</label>
				<div className="flex p-4 gap-4 w-full items-start">
					<Image
						src="/default-profile.png"
						alt=""
						width={40}
						height={40}
						className="rounded-full "
					/>
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
