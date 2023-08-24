'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const submitHandler = async (e) => {
		e.preventDefault();

		const signInResponse = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		if (signInResponse && !signInResponse.error) {
			router.push('/');
		} else {
			setError('Email or password is incorrect!');
		}
	};
	return (
		<>
			{error && (
				<div className="bg-red-500 text-white px-4 py-2 rounded-xl mt-4 -mb-2">
					{error}
				</div>
			)}
			<form
				action=""
				className="flex flex-col gap-6 mt-8"
				onSubmit={submitHandler}
			>
				<div className="flex flex-col gap-1">
					<label htmlFor="email" className="font-medium text-slate-800">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="input input-bordered w-full max-w-xs"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
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
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
				<div className="flex  mt-4">
					<button
						type="submit"
						className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2 text-center px-5 w-full"
					>
						Login
					</button>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
