'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SubmitButton from './SubmitButton';

const SignupForm = () => {
	const router = useRouter();

	const [userData, setUserData] = useState({
		fullName: '',
		username: '',
		email: '',
		password: '',
	});

	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState(false);

	const submitHandler = async (e) => {
		setProcessing(true);
		setError(null);
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
		setProcessing(false);
	};
	return (
		<div className="w-full">
			<form action="" className="flex flex-col gap-4" onSubmit={submitHandler}>
				<div className="flex flex-col gap-1">
					<label
						htmlFor="fullname"
						className="font-medium text-slate-800 text-sm"
					>
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
						maxLength={30}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label
						htmlFor="username"
						className="font-medium text-slate-800 text-sm"
					>
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
						maxLength={30}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="email" className="font-medium text-slate-800 text-sm">
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
					<label
						htmlFor="password"
						className="font-medium text-slate-800 text-sm"
					>
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
				<div className="flex justify-end mt-2">
					<SubmitButton text={'Sign Up'} processing={processing} />
				</div>
			</form>
			{error && <div className="text-red-600 text-center mt-4">{error}</div>}
		</div>
	);
};

export default SignupForm;
