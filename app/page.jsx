'use client';
import { useEffect, useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

export default function Home() {
	const [posts, setPosts] = useState([]);

	const fetchPost = async () => {
		try {
			const fetchData = await fetch('/api/post');
			const post = await fetchData.json();
			setPosts(post.data);
		} catch (e) {
			console.error('Error fetching data');
		}
	};

	useEffect(() => {
		fetchPost();
	}, []);

	return (
		<main className="bg-slate-100 h-screen flex flex-col w-full items-center">
			<PostForm fetchPost={fetchPost} />
			<PostList posts={posts} />
		</main>
	);
}
