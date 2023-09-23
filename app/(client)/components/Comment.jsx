import React from 'react';
import Avatar from './Avatar';
import Link from 'next/link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { formatDistanceToNowStrict } from 'date-fns';

const Comment = ({ comment, fetchPost }) => {
	const commentDeleteHandler = async (commentid) => {
		try {
			const deleteResponse = await fetch(
				`/api/comments/${comment.post}/${commentid}`,
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
		<div>
			<div className="p-4 flex gap-4 w-full justify-between">
				<div className="w-1/12 mt-1">
					<Avatar
						username={comment.user.username}
						image={comment.user.dp.url}
					/>
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
							{formatDistanceToNowStrict(new Date(comment.createdAt))}
						</span>
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default Comment;
