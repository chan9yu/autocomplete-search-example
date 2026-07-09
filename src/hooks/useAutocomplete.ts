import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { KeyboardEvent } from "react";
import { useId, useState } from "react";

import { fetchAutocomplete } from "../services/fetchAutocomplete";
import { useDebouncedValue } from "./useDebouncedValue";
import { useListNavigation } from "./useListNavigation";

const DEBOUNCE_MS = 300;
const CACHE_TTL_MS = 5 * 60 * 1000;
const MIN_CHARS = 2;

export function useAutocomplete() {
	const listboxId = useId();
	const [query, setQueryState] = useState("");
	const [isDismissed, setIsDismissed] = useState(false);
	const debouncedQuery = useDebouncedValue({ value: query, delay: DEBOUNCE_MS });

	const { data, isError } = useQuery({
		queryKey: ["autocomplete", debouncedQuery],
		queryFn: ({ signal }) => fetchAutocomplete(debouncedQuery, signal),
		enabled: debouncedQuery.length >= MIN_CHARS,
		staleTime: CACHE_TTL_MS,
		placeholderData: keepPreviousData
	});

	const isOpen = query.length >= MIN_CHARS && !isDismissed;
	const results = isOpen ? (data ?? []) : [];

	const navigation = useListNavigation(results.length);
	const highlightedResult = navigation.index >= 0 ? results[navigation.index] : undefined;

	const setQuery = (value: string) => {
		setQueryState(value);
		navigation.reset();
		setIsDismissed(false);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				navigation.next();
				break;
			case "ArrowUp":
				event.preventDefault();
				navigation.prev();
				break;
			case "Escape":
				navigation.reset();
				setIsDismissed(true);
				break;
		}
	};

	return {
		query,
		setQuery,
		results,
		isLoading: isOpen && !isError && data === undefined,
		isError: isOpen && isError,
		isOpen,
		listboxId,
		highlightedIndex: navigation.index,
		highlightedResult,
		handleKeyDown
	};
}
