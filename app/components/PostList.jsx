'use client';

const PostList = ({ posts }) => {
	return (
		<div>
			{posts.map((value) => (
				<div key={value._id}>
					<div>{value.text}</div>
				</div>
			))}
		</div>
	);
};

export default PostList;
