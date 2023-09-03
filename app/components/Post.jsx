import Link from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentForm from './CommentForm';
import { useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { useSession } from 'next-auth/react';
import PostEditForm from './PostEditForm';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from './Avatar';

const Post = ({ value, fetchPosts }) => {
	const [showComment, setShowComment] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [post, setPost] = useState(value);

	const fetchPost = async () => {
		try {
			const fetchData = await fetch(`/api/post/${post._id}`);
			const postData = await fetchData.json();
			setPost(postData.data);
		} catch (e) {
			console.error('Error fetching data');
		}
	};

	const { data: session, status } = useSession();

	const showCommentHandler = async () => {
		await fetchPost();
		setShowComment((prev) => (prev ? false : true));
	};

	const likeHandler = async () => {
		try {
			const likeResponse = await fetch(`/api/likes/${post._id}`, {
				method: 'POST',
			});
			const data = await likeResponse.json();
			fetchPost();
		} catch (e) {
			console.log('Something went wrong!');
		}
	};

	const postDeleteHandler = async () => {
		try {
			const deletResponse = await fetch(`/api/post/${post._id}`, {
				method: 'DELETE',
			});
			fetchPosts();
		} catch (e) {
			console.log('Something went wrong');
		}
	};

	const commentDeleteHandler = async (commentid) => {
		try {
			const deletResponse = await fetch(
				`/api/comments/${post._id}/${commentid}`,
				{
					method: 'DELETE',
				}
			);
			fetchPost();
		} catch (e) {
			console.log('Something went wrong');
		}
	};

	return (
		<div className="bg-white max-w-[30rem] w-11/12 mx-auto rounded-xl flex flex-col item-c shadow-sm divide-y">
			<div className="p-4 flex flex-col gap-4">
				<div className="flex gap-4 items-center ">
					<Avatar text={post.user.username} />
					<div className="flex flex-col gap-0.5 mt-1">
						<Link
							href={`/profile/${post.user.username}`}
							className="font-medium text-sm text-slate-800"
						>
							{post.user.username}
						</Link>
						<span className="text-xs text-slate-400 font-medium">
							{formatDistanceToNowStrict(new Date(post.createdAt))}
						</span>
					</div>
					<div className="ms-auto dropdown dropdown-bottom dropdown-end">
						<label tabIndex={0} className="m-1 cursor-pointer">
							<MoreHorizIcon />
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<button className="text-red-500" onClick={postDeleteHandler}>
									Delete
								</button>
							</li>
							<li>
								<button
									onClick={() => {
										setIsEditing(true);
									}}
								>
									Edit
								</button>
							</li>
						</ul>
					</div>
				</div>
				{isEditing ? (
					<PostEditForm
						text={post.text}
						postid={post._id}
						setIsEditing={setIsEditing}
						fetchPost={fetchPost}
					/>
				) : (
					<div className="text-slate-800">{post.text}</div>
				)}
			</div>

			<div className="flex divide-x w-full items-center">
				<div
					className="flex flex-1 justify-center items-center py-3 cursor-pointer gap-2 "
					onClick={likeHandler}
				>
					{post.likes.includes(session?.user.id) ? (
						<FavoriteIcon className="text-red-600" fontSize="small" />
					) : (
						<FavoriteBorderIcon fontSize="small" />
					)}
					<span className="text-sm">{post.likes.length}</span>
				</div>
				<div
					className="flex flex-1 justify-center items-center py-3 cursor-pointer gap-2"
					onClick={showCommentHandler}
				>
					<ModeCommentOutlinedIcon fontSize="small" />
					<span>{post.comments.length}</span>
				</div>
			</div>
			{showComment && (
				<div
					className={`px-5 py-6 transition-transform ${
						showComment ? 'block' : 'hidden'
					}`}
				>
					<CommentForm postid={post._id} fetchPost={fetchPost} />
					{post.comments.length !== 0 && (
						<>
							<div>All Comments</div>
							{post.comments.map((comment) => (
								<div key={comment._id}>
									<div className="p-4 flex gap-4 w-full justify-between">
										<div className="w-1/12 mt-1">
											<Avatar text={comment.user.username} />
										</div>
										<div className="flex w-11/12 flex-col">
											<p className="break-words">
												<Link
													href={`/profile/${comment.user.username}`}
													className="text-sm text-slate-800 me-2 font-semibold"
												>
													{comment.user.username}
												</Link>
												{comment.text}
											</p>

											<div className="flex items-center gap-4">
												<span className="text-xs text-slate-400 font-medium">
													{formatDistanceToNowStrict(
														new Date(comment.createdAt)
													)}
												</span>
												{/* dropdown */}
												<div className="ms-auto dropdown dropdown-bottom dropdown-end">
													<label tabIndex={0} className="m-1 cursor-pointer">
														<MoreHorizIcon />
													</label>
													<ul
														tabIndex={0}
														className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
													>
														<li>
															<button
																className="text-red-500"
																onClick={() => {
																	commentDeleteHandler(comment._id);
																}}
															>
																Delete
															</button>
														</li>
													</ul>
												</div>
												{/* dropdown end */}
											</div>
										</div>
									</div>
								</div>
							))}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Post;
