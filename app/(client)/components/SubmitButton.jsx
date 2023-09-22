const SubmitButton = ({ text, processing }) => {
	return (
		<button
			type="submit"
			className={`btn bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2 text-center px-5 w-full ${
				processing && 'btn-disabled'
			}`}
		>
			{processing ? (
				<span class="loading loading-spinner loading-sm"></span>
			) : (
				<span>{text}</span>
			)}
		</button>
	);
};

export default SubmitButton;
