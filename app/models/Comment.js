import mongoose from 'mongoose';
import User from './User';
import Post from './Post';

const commentSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Comment ||
	mongoose.model('Comment', commentSchema);
