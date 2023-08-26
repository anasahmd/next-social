'use client';
import Post from './Post';

const PostList = ({ posts }) => {
	return (
		<div className="flex flex-col gap-4 my-4">
			{posts.map((value) => (
				<div key={value._id}>
					<Post value={value} />
				</div>
			))}
		</div>
	);
};

export default PostList;
