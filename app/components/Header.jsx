import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import HeaderDropdown from './HeaderDropdown';

const Header = async () => {
	const session = await getServerSession(authOptions);
	return (
		<header>
			<nav className="flex justify-between items-center  shadow-sm bg-white px-4">
				<div className="navbar bg-base-100">
					<div className="flex-1">
						<Link href="/" className="btn btn-ghost normal-case text-xl">
							Next Social
						</Link>
					</div>

					{/* Based on login */}

					{session ? (
						<HeaderDropdown user={session.user} />
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
