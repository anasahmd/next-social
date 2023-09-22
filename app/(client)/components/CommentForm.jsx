'use client';
import { useState } from 'react';

const CommentForm = ({ postid, fetchPost }) => {
	const [text, setText] = useState('');

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			let data = await fetch(`/api/comments/${postid}`, {
				method: 'POST',
				body: JSON.stringify({ text }),
				headers: { 'content-type': 'application/json' },
			});
			setText('');
			fetchPost();
		} catch (e) {
			console.log('Error fetching data');
		}
	};
	return (
		<div>
			<form action="" onSubmit={submitHandler}>
				<textarea
					type="text"
					id="text"
					placeholder="Add your comment"
					className="textarea textarea-bordered  w-full px-2 text-base "
					rows={2}
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
				></textarea>
				<div className=" flex justify-end mt-2">
					<button
						type="submit"
						className=" btn-sm btn bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
					>
						Post
					</button>
				</div>
			</form>
		</div>
	);
};

export default CommentForm;
