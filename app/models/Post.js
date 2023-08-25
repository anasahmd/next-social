import mongoose from 'mongoose';
import User from './User';
import Comment from './Comment';

const postSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		edited: {
			type: Boolean,
			default: false,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', postSchema);
