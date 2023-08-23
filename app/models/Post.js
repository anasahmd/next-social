import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', postSchema);
