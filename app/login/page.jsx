import React from 'react';
import LoginForm from '../components/LoginForm';
import GoogleSignIn from '../components/GoogleSignIn';

const page = () => {
	return (
		<main className="bg-slate-100 flex  items-center min-h-screen flex-col gap-4 mt-20">
			<div className="bg-white p-10 rounded-xl shadow-sm max-w-[25rem] w-11/12 mx-auto">
				<h1 className="text-3xl font-semibold">Login</h1>
				<LoginForm />
				<GoogleSignIn />
			</div>
		</main>
	);
};

export default page;
