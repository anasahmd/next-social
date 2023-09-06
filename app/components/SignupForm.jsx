'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignupForm = () => {
	const router = useRouter();

	const [userData, setUserData] = useState({
		fullName: '',
		username: '',
		email: '',
		password: '',
	});

	const [error, setError] = useState(null);

	const submitHandler = async (e) => {
		e.preventDefault();

		let signUpResponse = await fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify(userData),
			headers: { 'content-type': 'application/json' },
		});

		signUpResponse = await signUpResponse.json();

		if (signUpResponse && !signUpResponse.error) {
			const signInResponse = await signIn('credentials', {
				email: userData.email,
				password: userData.password,
				redirect: false,
			});
			if (signInResponse && !signInResponse.error) {
				router.refresh();
				router.push('/');
			} else {
				setError(signInResponse.error);
			}
		} else {
			setError(signUpResponse.error);
		}
	};
	return (
		<div>
			{error && (
				<div className="bg-red-500 text-white px-4 py-2 rounded-xl mt-4 -mb-2 w-full">
					{error}
				</div>
			)}
			<form
				action=""
				className="flex flex-col gap-6 mt-8"
				onSubmit={submitHandler}
			>
				<div className="flex flex-col gap-1">
					<label htmlFor="fullname" className="font-medium text-slate-800">
						Full Name
					</label>
					<input
						type="text"
						id="fullname"
						className="input input-bordered w-full max-w-xs"
						placeholder="Enter your full name"
						value={userData.fullName}
						onChange={(e) => {
							setUserData({ ...userData, fullName: e.target.value });
						}}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="username" className="font-medium text-slate-800">
						Username
					</label>
					<input
						type="text"
						id="username"
						className="input input-bordered w-full max-w-xs"
						placeholder="Enter username"
						value={userData.username}
						onChange={(e) => {
							setUserData({ ...userData, username: e.target.value });
						}}
						required
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="email" className="font-medium text-slate-800">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="input input-bordered w-full max-w-xs"
						placeholder="Enter your email"
						value={userData.email}
						onChange={(e) => {
							setUserData({ ...userData, email: e.target.value });
						}}
						required
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="password" className="font-medium text-slate-800">
						Password
					</label>
					<input
						type="password"
						id="password"
						className="input input-bordered w-full max-w-xs"
						placeholder="Enter your password"
						value={userData.password}
						onChange={(e) => {
							setUserData({ ...userData, password: e.target.value });
						}}
						required
					/>
				</div>
				<div className="flex justify-end mt-4">
					<button
						type="submit"
						className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2 text-center px-5 w-full"
					>
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignupForm;
