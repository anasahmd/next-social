'use client';
import { useEffect, useState } from 'react';
import PostList from './PostList';

const UserPostList = ({ username }) => {
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		try {
			const fetchData = await fetch(`/api/profile/${username}`);
			const data = await fetchData.json();
			setPosts(data.user.posts);
		} catch (e) {
			console.error('Error fetching data!');
		}
	};

	useEffect(() => {
		fetchPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<PostList posts={posts} fetchPosts={fetchPosts} />
		</div>
	);
};

export default UserPostList;
