import { useState } from "react";

export function useListNavigation(length: number) {
	const [index, setIndex] = useState(-1);

	const reset = () => {
		setIndex(-1);
	};

	const next = () => {
		setIndex((current) => {
			if (length === 0) return -1;
			return (current + 1) % length;
		});
	};

	const prev = () => {
		setIndex((current) => {
			if (length === 0) return -1;
			if (current <= 0) return length - 1;
			return current - 1;
		});
	};

	return {
		index,
		reset,
		next,
		prev
	};
}
