import React from 'react';
import SignupForm from '../components/SignupForm';

const page = () => {
	return (
		<main className=" flex  items-center min-h-screen flex-col gap-4 mt-10">
			<div className="bg-white p-10 rounded-xl shadow-sm max-w-[25rem] w-11/12 mx-auto">
				<h1 className="text-3xl font-semibold">Sign Up</h1>
				<SignupForm />
			</div>
		</main>
	);
};

export default page;
