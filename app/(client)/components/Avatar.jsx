import Image from 'next/image';

const Avatar = ({ username, image }) => {
	return (
		<div className="avatar placeholder">
			{image ? (
				<Image
					src={image}
					alt={`Profile picture of ${username}`}
					width={40}
					height={40}
					className="rounded-full"
				/>
			) : (
				<div className="bg-neutral-focus text-neutral-content rounded-full aspect-square h-8">
					<span className="text-sm">{username.slice(0, 1).toUpperCase()}</span>
				</div>
			)}
		</div>
	);
};

export default Avatar;
