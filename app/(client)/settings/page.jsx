import { getServerSession } from 'next-auth';

import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import UpdateUserForm from '../components/UpdateUserForm';

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
			<div className="bg-white p-10 w-11/12 max-w-[30rem] rounded-xl shadow-sm">
				<h1 className="text-3xl font-semibold">Settings</h1>
				<UpdateUserForm user={user} />
			</div>
		</main>
	);
};

export default page;
