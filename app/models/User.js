import mongoose, { mongo } from 'mongoose';
import Post from './Post';

const userSchema = new mongoose.Schema(
	{
		email: { type: String, unique: true, required: true },
		fullName: { type: String },
		username: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		bio: { type: String },
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
