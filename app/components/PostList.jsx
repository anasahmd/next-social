'use client';
import Image from 'next/image';
import { formatDistanceToNowStrict } from 'date-fns';
import Link from 'next/link';

const Post = ({
	text,
	username = 'defaultusername',
	date,
	profilePic = '/default-profile.png',
}) => {
	return (
		<div className="bg-white w-[30rem] rounded-xl flex flex-col p-4 shadow-sm gap-4">
			<div className="flex gap-4 items-start">
				<Image
					src={profilePic}
					alt={`Profile Picture of ${username}`}
					width={40}
					height={40}
					className="rounded-full"
				></Image>
				<div className="flex flex-col gap-0.5">
					<Link
						href={`/user/${username}`}
						className="font-semibold text-slate-800"
					>
						{username}
					</Link>
					<span className="text-xs text-slate-400 font-medium">{date}</span>
				</div>
			</div>
			<div className="text-slate-800">{text}</div>
		</div>
	);
};

const PostList = ({ posts }) => {
	return (
		<div className="flex flex-col gap-4 my-4">
			{posts.map((value) => (
				<div key={value._id}>
					<Post
						text={value.text}
						username={value.user?.username}
						date={formatDistanceToNowStrict(new Date(value.createdAt))}
						profilePic={value.user?.profile}
					/>
				</div>
			))}
		</div>
	);
};

export default PostList;
