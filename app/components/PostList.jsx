'use client';
import { formatDistanceToNowStrict } from 'date-fns';
import Post from './Post';

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
						postid={value._id}
					/>
				</div>
			))}
		</div>
	);
};

export default PostList;
