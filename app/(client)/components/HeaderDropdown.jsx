'use client';
import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Avatar from './Avatar';

const HeaderDropdown = ({ user }) => {
	const router = useRouter();
	const handleSignOut = () => {
		signOut({ callbackUrl: '/login' });
		router.refresh();
	};

	return (
		<div className="flex-none gap-2">
			<div className="dropdown dropdown-end">
				<label tabIndex={0} className="btn btn-ghost btn-circle h-auto">
					<Avatar username={user.username} image={user.image} />
				</label>
				<ul
					tabIndex={0}
					className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
				>
					<li>
						<Link
							className="justify-between"
							href={`/profile/${user.username}`}
						>
							Profile
						</Link>
					</li>
					<li>
						<Link href="/settings">Settings</Link>
					</li>
					<li>
						<button onClick={handleSignOut}>Sign Out</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default HeaderDropdown;
