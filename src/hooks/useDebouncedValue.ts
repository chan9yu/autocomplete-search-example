import { useEffect, useState } from "react";

type UseDebouncedValueProps<T> = {
	value: T;
	delay: number;
};

export function useDebouncedValue<T>({ value, delay }: UseDebouncedValueProps<T>) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [delay, value]);

	return debouncedValue;
}
