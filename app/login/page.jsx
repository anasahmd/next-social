import React from 'react';
import LoginForm from '../components/LoginForm';

const page = () => {
	return (
		<main className="bg-slate-100 flex justify-center items-center min-h-screen flex-col gap-4">
			<div className="bg-white p-10 rounded-xl">
				<h1 className="text-3xl font-semibold">Login</h1>
				<LoginForm />
			</div>
		</main>
	);
};

export default page;
