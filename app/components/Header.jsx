import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import ProfileImage from '@/app/60.jpg';
import Image from 'next/image';

const DropDown = () => {
	return (
		<div className="flex-none gap-2">
			<div className="dropdown dropdown-end">
				<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
					<div className="w-10 rounded-full">
						<Image src={ProfileImage} alt="Profile image" />
					</div>
				</label>
				<ul
					tabIndex={0}
					className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
				>
					<li>
						<Link className="justify-between" href={'/'}>
							Profile
						</Link>
					</li>
					<li>
						<Link href="/user/settings">Settings</Link>
					</li>
					<li>
						<Link href="/logout">Logout</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

const Header = async () => {
	const session = await getServerSession(options);
	console.log(session);
	return (
		<header>
			<nav className="flex justify-between items-center  shadow-sm bg-white">
				<div className="navbar bg-base-100">
					<div className="flex-1">
						<Link href="/" className="btn btn-ghost normal-case text-xl">
							Next Social
						</Link>
					</div>

					{/* Based on login */}

					{session ? (
						<DropDown />
					) : (
						<div className="flex gap-6 items-center">
							<Link href="login" className="btn btn-ghost normal-case py-2">
								Login
							</Link>
							<Link
								href="/signup"
								className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2 text-center px-4 "
							>
								Sign up
							</Link>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
