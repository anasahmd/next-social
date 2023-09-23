'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Avatar from './Avatar';

const ProfileCard = ({ defaultUser }) => {
	const { data: session, status } = useSession();

	const [user, setUser] = useState(defaultUser);

	const fetchUser = async () => {
		const fetchedData = await fetch(`/api/profile/${user.username}`);
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
		<div className="mt-10 bg-white  max-w-[30rem] w-11/12 rounded-xl divide-y shadow-sm mx-auto">
			<div className="flex flex-col items-center  py-6 px-4">
				<div>
					<Avatar username={user.username} image={user.dp.url} size={75} />
				</div>
				<div className="font-medium text-xl mt-4 text-slate-700">
					{user?.fullName}
				</div>
				<div className=" text-sm text-slate-500">@{user.username}</div>
				<div className="mt-4">
					{status == 'authenticated' && user._id == session.user?.id ? (
						<Link
							href="/settings"
							className="btn normal-case btn-outline rounded-md py-2 h-full text-sm btn-sm px-4 text-slate-700 hover:bg-slate-700 border-slate-300 border-1"
						>
							Edit Profile
						</Link>
					) : status == 'authenticated' &&
					  user.followers.includes(session.user?.id) ? (
						<button
							className="btn normal-case btn-outline rounded-md py-2 h-full text-sm btn-sm px-4 text-slate-700 hover:bg-blue-600 border-slate-300 border-1"
							onClick={followhandler}
						>
							Following
						</button>
					) : (
						<button
							className="btn normal-case hover:bg-blue-600 bg-blue-500 text-white rounded-md py-2 h-full text-sm btn-sm px-4"
							onClick={followhandler}
						>
							Follow
						</button>
					)}
				</div>
				{user.bio && (
					<div className="mt-4 text-center text-slate-700">{user.bio}</div>
				)}
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
