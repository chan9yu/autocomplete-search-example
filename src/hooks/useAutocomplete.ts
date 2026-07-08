import { useEffect, useState } from "react";

import type { Result } from "../models/autocomplete";
import { fetchAutocomplete } from "../services/fetchAutocomplete";
import { useDebouncedValue } from "./useDebouncedValue";

const DEBOUNCE_MS = 300;
const MIN_CHARS = 2;

export function useAutocomplete() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Result[]>([]);

	const debouncedQuery = useDebouncedValue({ value: query, delay: DEBOUNCE_MS });

	useEffect(() => {
		if (debouncedQuery.length < MIN_CHARS) return;
		fetchAutocomplete(debouncedQuery).then((fetched) => fetched && setResults(fetched));
	}, [debouncedQuery]);

	const visibleResults = query.length >= MIN_CHARS ? results : [];

	return {
		query,
		setQuery,
		results: visibleResults
	};
}
