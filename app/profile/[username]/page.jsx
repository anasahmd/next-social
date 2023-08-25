import React from 'react';
import Image from 'next/image';

const page = async ({ params }) => {
	const { username } = params;
	const fetchedData = await fetch(
		`${process.env.APP_URI}/api/profile/${username}`
	);
	const data = await fetchedData.json();
	const user = data.user;
	return (
		<main className="min-h-screen flex items-center flex-col">
			{user ? (
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
						<div className="mt-4 text-center text-slate-700">
							{'Web Developer and CSE student'}
						</div>
					</div>
					<div className="flex divide-x w-full items-center">
						<div className="flex-1 flex flex-col gap-1 items-center justify-center py-2">
							<div className="font-semibold text-slate-700">Posts</div>
							<div className="text-base">10</div>
						</div>
						<div className="flex-1 flex flex-col gap-1 items-center justify-center py-2">
							<div className="font-semibold text-slate-700">Followers</div>
							<div className="text-base">532</div>
						</div>
						<div className="flex-1 flex flex-col gap-1 items-center justify-center py-2">
							<div className="font-semibold text-slate-700">Following</div>
							<div className="text-base">645</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</main>
	);
};

export default page;
