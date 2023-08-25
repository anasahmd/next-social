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
	username = 'null',
	date,
	profilePic = '/default-profile.png',
}) => {
	const [showComment, setShowComment] = useState(false);

	const { data: session, status } = useSession();

	const showCommentHandler = () => {
		setShowComment((prev) => (prev ? false : true));
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
				<div className="flex flex-1 justify-center items-center py-3 cursor-pointer gap-2">
					<FavoriteBorderIcon fontSize="small" />
					<span>10</span>
				</div>
				<div
					className="flex flex-1 justify-center items-center py-3 cursor-pointer gap-2"
					onClick={showCommentHandler}
				>
					<ModeCommentOutlinedIcon fontSize="small" />
					<span>10</span>
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
