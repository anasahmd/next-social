import React from 'react';

const page = () => {
	return (
		<main className=" flex  items-center min-h-screen flex-col gap-4 mt-10">
			<div className="bg-white p-10 rounded-xl shadow-sm">
				<h1 className="text-3xl font-semibold">Sign Up</h1>
				<form action="" className="flex flex-col gap-6 mt-8">
					<div className="flex flex-col gap-1">
						<label htmlFor="fullname" className="font-medium text-slate-800">
							Full Name
						</label>
						<input
							type="text"
							id="fullname"
							className="input input-bordered w-full max-w-xs"
							placeholder="Enter your full name"
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
		</main>
	);
};

export default page;
