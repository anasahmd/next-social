import Link from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Image from 'next/image';
import CommentForm from './CommentForm';
import { useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { useSession } from 'next-auth/react';

const Post = ({ value }) => {
	const [showComment, setShowComment] = useState(false);

	const [comments, setComments] = useState(value.comments);
	const [likes, setLikes] = useState(value.likes);

	const fetchPost = async () => {
		try {
			const fetchData = await fetch(`/api/post/${value._id}`);
			const post = await fetchData.json();
			setComments(post.data.comments);
			setLikes(post.data.likes);
		} catch (e) {
			console.error('Error fetching data');
		}
	};

	// const { session, status } = useSession();

	const showCommentHandler = () => {
		setShowComment((prev) => (prev ? false : true));
	};

	const likeHandler = async () => {
		try {
			const likeResponse = await fetch(`/api/likes/${value._id}`, {
				method: 'POST',
			});
			const data = await likeResponse.json();
			console.log(data);
			fetchPost();
		} catch (e) {
			console.log('Something went wrong!');
		}
	};

	return (
		<div className="bg-white w-[30rem] rounded-xl flex flex-col  shadow-sm divide-y">
			<div className="p-4 flex flex-col gap-4">
				<div className="flex gap-4 items-center ">
					<Image
						src={value.profilePic ? value.profilePic : '/default-profile.png'}
						alt={`Profile Picture of ${value.user.username}`}
						width={40}
						height={40}
						className="rounded-full"
					></Image>
					<div className="flex flex-col gap-0.5 mt-1">
						<Link
							href={`/profile/${value.user.username}`}
							className="font-medium text-sm text-slate-800"
						>
							{value.user.username}
						</Link>
						<span className="text-xs text-slate-400 font-medium">
							{formatDistanceToNowStrict(new Date(value.createdAt))}
						</span>
					</div>
				</div>
				<div className="text-slate-800">{value.text}</div>
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
					<CommentForm postid={value._id} fetchPost={fetchPost} />
					{comments.length && (
						<>
							<div>All Comments</div>
							{comments.map((comment) => (
								<div key={comment._id}>{comment.text}</div>
							))}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Post;
