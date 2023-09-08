const Avatar = ({ text }) => {
	return (
		<div className="avatar placeholder">
			<div className="bg-neutral-focus text-neutral-content rounded-full aspect-square h-8">
				<span className="text-sm">{text?.slice(0, 1).toUpperCase()}</span>
			</div>
		</div>
	);
};

export default Avatar;
