import type { MouseEvent } from "react";

type ResultItemProps = {
	id: string;
	text: string;
	isHighlighted: boolean;
	onSelect: () => void;
};

export function ResultItem({ id, text, isHighlighted, onSelect }: ResultItemProps) {
	const handleMouseDown = (event: MouseEvent<HTMLLIElement>) => {
		event.preventDefault();
	};

	return (
		<li
			id={id}
			className="option"
			role="option"
			aria-selected={isHighlighted}
			onMouseDown={handleMouseDown}
			onClick={onSelect}
		>
			{text}
		</li>
	);
}
