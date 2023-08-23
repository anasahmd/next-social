import mongoose from 'mongoose';

export default async function Connect() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
	} catch (e) {
		throw new Error('Database Connection failed');
	}
}
