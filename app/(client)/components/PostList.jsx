'use client';
import Post from './Post';

const PostList = ({ posts }) => {
	return (
		<div className="w-full flex flex-col gap-4 my-4 items-center">
			{posts?.map((value) => (
				<div key={value._id} className="w-full mx-auto">
					<Post value={value} />
				</div>
			))}
		</div>
	);
};

export default PostList;
