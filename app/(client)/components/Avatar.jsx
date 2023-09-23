import Image from 'next/image';

const Avatar = ({ username, image, size = 40 }) => {
	return (
		<div className="avatar placeholder w-full">
			{image ? (
				<Image
					src={image}
					alt={`Profile picture of ${username}`}
					width={size}
					height={size}
					className="rounded-full w-full aspect-square"
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
