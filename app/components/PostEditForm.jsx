import React, { useState } from 'react';

const PostEditForm = ({ text, postid, setIsEditing, fetchPost }) => {
	const [editedText, setEditedText] = useState(text);
	const editFormHandler = async (e) => {
		e.preventDefault();
		const fetchData = await fetch(`/api/post/${postid}`, {
			method: 'PUT',
			body: JSON.stringify({ text: editedText }),
			headers: { 'content-type': 'application/json' },
		});
		setIsEditing(false);
		fetchPost();
	};
	return (
		<form action="" onSubmit={editFormHandler}>
			<textarea
				type="text"
				id="text"
				placeholder="What's on your mind?"
				className="textarea textarea-bordered w-full px-2 text-base focus:outline-none"
				rows={3}
				value={editedText}
				onChange={(e) => {
					setEditedText(e.target.value);
				}}
			></textarea>
			<div className=" py-4 flex gap-4 justify-end">
				<button
					className="text-sm"
					onClick={() => {
						setIsEditing(false);
					}}
				>
					Cancel
				</button>
				<button
					type="submit"
					className="btn hover:bg-blue-600 bg-blue-500 text-white rounded-xl py-3 h-full text-center px-4 btn-sm"
				>
					Edit
				</button>
			</div>
		</form>
	);
};

export default PostEditForm;
