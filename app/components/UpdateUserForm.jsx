'use client';
import { useState } from 'react';

const UpdateUserForm = ({ user }) => {
	const [bio, setBio] = useState(user.bio);

	const submitHandler = async (e) => {
		e.preventDefault();
		const updateResponse = await fetch(`/api/profile/${user.username}`, {
			method: 'PUT',
			body: JSON.stringify({ bio }),
			headers: { 'content-type': 'application/json' },
		});

		if (updateResponse && updateResponse.error) {
			setBio(user.bio);
		}
	};
	return (
		<form
			action=""
			className="flex flex-col gap-6 mt-8"
			onSubmit={submitHandler}
		>
			<div className="flex flex-col gap-1">
				<label htmlFor="bio" className="font-medium text-slate-800">
					Update your bio
				</label>
				<textarea
					type="text"
					id="bio"
					placeholder="Add your bio..."
					className="textarea textarea-bordered w-full px-2 text-base"
					rows={3}
					value={bio}
					onChange={(e) => {
						setBio(e.target.value);
					}}
				></textarea>
			</div>
			<div className="flex justify-end mt-4">
				<button
					type="submit"
					className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2 text-center px-5 w-full"
				>
					Update
				</button>
			</div>
		</form>
	);
};

export default UpdateUserForm;
