import React from 'react';
import SignupForm from '../components/SignupForm';
import GoogleSignIn from '../components/GoogleSignIn';
import Link from 'next/link';

const page = () => {
	return (
		<main className=" flex  items-center min-h-screen flex-col gap-4 sm:mt-10">
			<div className="sm:bg-white p-6 sm:p-10 sm:rounded-xl sm:shadow-sm max-w-[25rem] w-11/12 mx-auto flex flex-col items-center gap-4">
				<h1 className="text-2xl font-semibold ">Sign Up</h1>
				<SignupForm />
				<div>
					Already have an account? <Link href="/login">Login</Link>
				</div>
				<div className="divider">OR</div>
				<GoogleSignIn />
			</div>
		</main>
	);
};

export default page;
