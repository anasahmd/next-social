'use client';
import Post from './Post';

const PostList = ({ posts, fetchPosts }) => {
	return (
		<div className="w-full flex flex-col gap-4 my-4 items-center">
			{posts?.map((value) => (
				<div key={value._id} className="w-full mx-auto">
					<Post value={value} fetchPosts={fetchPosts} />
				</div>
			))}
		</div>
	);
};

export default PostList;
