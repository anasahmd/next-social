import ProfileCard from '@/app/(client)/components/ProfileCard';
import UserPostList from '@/app/(client)/components/UserPostList';

const page = async ({ params }) => {
	const { username } = params;

	const fetchedData = await fetch(
		`${process.env.NEXTAUTH_URL}/api/profile/${username}`,
		{ cache: 'no-store' }
	);
	const data = await fetchedData.json();
	const user = data?.user;

	return (
		<main className="min-h-screen flex items-center flex-col">
			{user && (
				<div className="w-full">
					<ProfileCard defaultUser={user} />
					<UserPostList username={username} />
				</div>
			)}
		</main>
	);
};

export default page;
