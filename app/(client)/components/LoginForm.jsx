'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SubmitButton from './SubmitButton';

const LoginForm = () => {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState(false);

	const submitHandler = async (e) => {
		setProcessing(true);
		e.preventDefault();
		setError(null);
		const signInResponse = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		if (signInResponse && !signInResponse.error) {
			router.refresh();
			router.push('/');
		} else {
			setError('Email or password is incorrect!');
		}
		setProcessing(false);
	};
	return (
		<div className="w-full">
			<form action="" className="flex flex-col gap-4" onSubmit={submitHandler}>
				<div className="flex flex-col gap-1">
					<label htmlFor="email" className="font-medium text-slate-800 text-sm">
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
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
					/>
				</div>
				<div className="flex mt-2">
					<SubmitButton text={'Login'} processing={processing} />
				</div>
			</form>
			{error && <div className="text-red-600 text-center mt-4">{error}</div>}
		</div>
	);
};

export default LoginForm;
