import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { fetchAutocomplete } from "../services/fetchAutocomplete";
import { useDebouncedValue } from "./useDebouncedValue";

const DEBOUNCE_MS = 300;
const CACHE_TTL_MS = 5 * 60 * 1000;
const MIN_CHARS = 2;

export function useAutocomplete() {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebouncedValue({ value: query, delay: DEBOUNCE_MS });

	const { data, isError } = useQuery({
		queryKey: ["autocomplete", debouncedQuery],
		queryFn: ({ signal }) => fetchAutocomplete(debouncedQuery, signal),
		enabled: debouncedQuery.length >= MIN_CHARS,
		staleTime: CACHE_TTL_MS,
		placeholderData: keepPreviousData
	});

	const isOpen = query.length >= MIN_CHARS;

	return {
		query,
		setQuery,
		results: isOpen ? (data ?? []) : [],
		isLoading: isOpen && !isError && data === undefined,
		isError: isOpen && isError,
		isOpen
	};
}
