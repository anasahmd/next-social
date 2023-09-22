'use client';
import GoogleLogo from '@/public/google.png';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const GoogleSignIn = () => {
	const handleClick = async () => {
		const signInResponse = await signIn('google', { callbackUrl: '/' });
	};
	return (
		<div className="w-full">
			<button
				className="btn w-full flex justify-center items-center gap-2 py-2 rounded-xl border-2 border-slate-200 bg-white "
				onClick={handleClick}
			>
				<Image src={GoogleLogo} width={20} height={20} alt="Google Logo" />
				<span className="text-sm text-slate-700">Continue with google</span>
			</button>
		</div>
	);
};

export default GoogleSignIn;
