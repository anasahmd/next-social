import Link from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Image from 'next/image';
import CommentForm from './CommentForm';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const Post = ({
	postid,
	text,
	username,
	date,
	profilePic = '/default-profile.png',
	likes,
	comments,
}) => {
	const [showComment, setShowComment] = useState(false);

	const { session, status } = useSession();

	const showCommentHandler = () => {
		setShowComment((prev) => (prev ? false : true));
	};

	const likeHandler = async () => {
		const likeResponse = await fetch(`/likes/${postid}`, { method: 'POST' });
		const data = await likeResponse.json();
	};

	return (
		<div className="bg-white w-[30rem] rounded-xl flex flex-col  shadow-sm divide-y">
			<div className="p-4 flex flex-col gap-4">
				<div className="flex gap-4 items-center ">
					<Image
						src={profilePic}
						alt={`Profile Picture of ${username}`}
						width={40}
						height={40}
						className="rounded-full"
					></Image>
					<div className="flex flex-col gap-0.5 mt-1">
						<Link
							href={`/profile/${username}`}
							className="font-medium text-sm text-slate-800"
						>
							{username}
						</Link>
						<span className="text-xs text-slate-400 font-medium">{date}</span>
					</div>
				</div>
				<div className="text-slate-800">{text}</div>
			</div>

			<div className="flex divide-x w-full items-center">
				<div
					className="flex flex-1 justify-center items-center py-3 cursor-pointer gap-2"
					onClick={likeHandler}
				>
					<FavoriteBorderIcon fontSize="small" />
					<span>{likes.length}</span>
				</div>
				<div
					className="flex flex-1 justify-center items-center py-3 cursor-pointer gap-2"
					onClick={showCommentHandler}
				>
					<ModeCommentOutlinedIcon fontSize="small" />
					<span>{comments.length}</span>
				</div>
			</div>
			{showComment && (
				<div className="px-5 py-6">
					<CommentForm postid={postid} />
				</div>
			)}
		</div>
	);
};

export default Post;
