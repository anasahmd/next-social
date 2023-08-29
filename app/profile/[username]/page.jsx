import ProfileCard from '@/app/components/ProfileCard';

const page = async ({ params }) => {
	const { username } = params;

	const fetchedData = await fetch(
		`${process.env.NEXTAUTH_URL}/api/profile/${username}`
	);
	const data = await fetchedData.json();
	const user = data?.user;

	return (
		<main className="min-h-screen flex items-center flex-col">
			{user ? <ProfileCard defaultUser={user} /> : <></>}
		</main>
	);
};

export default page;
