'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import ProfileImage from '@/app/60.jpg';

const PostForm = ({ fetchPost }) => {
	const [post, setPost] = useState({ text: '' });

	const submitHandler = async (e) => {
		e.preventDefault();

		let data = await fetch('http://127.0.0.1:3000/api/post', {
			method: 'POST',
			body: JSON.stringify(post),
			headers: { 'content-type': 'application/json' },
		});
		setPost({ text: '' });
		fetchPost();
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
				<div className="flex p-4 gap-2 w-full items-start">
					<Image
						src={ProfileImage}
						alt=""
						width={40}
						height={40}
						className="rounded-full mt-1"
					/>
					<textarea
						type="text"
						id="text"
						placeholder="What's on your mind?"
						className="border-none form-textarea focus:ring-0 rounded-xl text-lg w-full"
						rows={3}
						value={post.text}
						onChange={(e) => {
							setPost({ ...post, text: e.target.value });
						}}
					></textarea>
				</div>
				<div className="px-4 py-3 flex justify-end">
					<button
						type="submit"
						className="bg-blue-500 text-white rounded-xl py-2 text-center px-5"
					>
						Post
					</button>
				</div>
			</form>
		</div>
	);
};

export default PostForm;
