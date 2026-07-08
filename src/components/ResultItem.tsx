type ResultItemProps = {
	text: string;
};

export function ResultItem({ text }: ResultItemProps) {
	return (
		<li className="option" role="option">
			{text}
		</li>
	);
}
