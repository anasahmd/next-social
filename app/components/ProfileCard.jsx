'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const ProfileCard = ({ defaultUser }) => {
	const [user, setUser] = useState(defaultUser);

	const fetchUser = async () => {
		const fetchedData = await fetch(
			`${process.env.NEXTAUTH_URL}/api/profile/${username}`
		);
		const data = await fetchedData.json();
		setUser(data.user);
	};

	const followhandler = async () => {
		try {
			const followResponse = await fetch(`/api/follow/${user._id}`, {
				method: 'POST',
			});
			fetchUser();
		} catch (e) {
			console.log('Something went wrong!');
		}
	};
	return (
		<div className="mt-10 bg-white  w-[30rem] rounded-xl divide-y shadow-sm">
			<div className="flex flex-col items-center  py-6 px-4">
				<div>
					<Image
						src="/default-profile.png"
						className=""
						alt={`Profile image of ${user.fullName}`}
						width={75}
						height={75}
					></Image>
				</div>
				<div className="font-medium text-xl mt-4 text-slate-700">
					{user?.fullName}
				</div>
				<div className=" text-sm text-slate-500">@{user.username}</div>
				<div className="mt-4">
					<button
						className="btn normal-case hover:bg-blue-600 bg-blue-500 text-white rounded-md py-2 h-full text-sm btn-sm px-4"
						onClick={followhandler}
					>
						Follow
					</button>
				</div>
				<div className="mt-4 text-center text-slate-700">
					{'Web Developer and CSE student'}
				</div>
			</div>
			<div className="flex divide-x w-full items-center">
				<div className="flex-1 flex flex-col gap-1 items-center justify-center py-2">
					<div className="font-semibold text-slate-700">Posts</div>
					<div className="text-base">{user.posts.length}</div>
				</div>
				<div className="flex-1 flex flex-col gap-1 items-center justify-center py-2">
					<div className="font-semibold text-slate-700">Followers</div>
					<div className="text-base">{user.followers?.length}</div>
				</div>
				<div className="flex-1 flex flex-col gap-1 items-center justify-center py-2">
					<div className="font-semibold text-slate-700">Following</div>
					<div className="text-base">{user.following?.length}</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;