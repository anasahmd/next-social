import { getServerSession } from 'next-auth';
import UpdateUserForm from '../components/UpdateUserForm';
import authOptions from '../api/auth/[...nextauth]/authOptions';

const page = async () => {
	const session = await getServerSession(authOptions);

	const fetchedData = await fetch(
		`${process.env.APP_URI}/api/profile/${session.user.username}`,
		{
			cache: 'no-store',
		}
	);

	const data = await fetchedData.json();
	const user = data?.user;

	return (
		<main className=" flex  items-center min-h-screen flex-col gap-4 mt-10">
			<div className="bg-white p-10 rounded-xl shadow-sm">
				<h1 className="text-3xl font-semibold">Settings</h1>
				<UpdateUserForm user={user} />
			</div>
		</main>
	);
};

export default page;
