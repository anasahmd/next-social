'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Avatar from './Avatar';

const SearchBar = () => {
	const [users, setUsers] = useState([]);
	const [abortController, setAbortController] = useState(null);

	const fetchUsers = async (search) => {
		if (abortController) {
			abortController.abort();
		}

		const newAbortController = new AbortController();
		setAbortController(newAbortController);

		try {
			const fetchData = await fetch(`/api/search/${search}`, {
				cache: 'no-store',
				signal: newAbortController.signal,
			});
			const data = await fetchData.json();
			setUsers(data.users);
		} catch (e) {
			console.log('Something went wrong');
		}
	};

	return (
		<div>
			<div className="dropdown">
				<div className="form-control">
					<input
						type="text"
						placeholder="Search"
						className="input input-bordered w-24 md:w-auto"
						onChange={(e) => {
							fetchUsers(e.target.value);
						}}
					/>
				</div>
				{users.length > 0 && (
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-full"
					>
						{users.map((user) => (
							<li key={user._id}>
								<Link href={`/profile/${user.username}`}>
									<div className="flex items-center justify-center gap-4 py-1">
										<div className="w-8 h-8">
											<Avatar
												image={user.dp.url}
												username={user.username}
												size={20}
											/>
										</div>

										<span className="font-medium text-sm">{user.username}</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
