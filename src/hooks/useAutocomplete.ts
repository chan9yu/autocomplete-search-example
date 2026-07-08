import { useEffect, useState } from "react";

import type { Result } from "../models/autocomplete";
import { fetchAutocomplete } from "../services/fetchAutocomplete";
import { useDebouncedValue } from "./useDebouncedValue";
import { useTtlCache } from "./useTtlCache";

const DEBOUNCE_MS = 300;
const CACHE_TTL_MS = 5 * 60 * 1000;
const MIN_CHARS = 2;

export function useAutocomplete() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Result[]>([]);

	const resultsCache = useTtlCache<Result[]>(CACHE_TTL_MS);
	const debouncedQuery = useDebouncedValue({ value: query, delay: DEBOUNCE_MS });

	useEffect(() => {
		if (debouncedQuery.length < MIN_CHARS) return;

		const abortController = new AbortController();
		let ignore = false;

		const cached = resultsCache.get(debouncedQuery);
		const resultsPromise = cached
			? Promise.resolve(cached)
			: fetchAutocomplete(debouncedQuery, abortController.signal).then((results) => {
					resultsCache.set(debouncedQuery, results);
					return results;
				});

		resultsPromise
			.then((results) => !ignore && setResults(results))
			.catch((error) => {
				const isAbortError = error instanceof DOMException && error.name === "AbortError";
				if (!isAbortError) throw error;
			});

		return () => {
			ignore = true;
			abortController.abort();
		};
	}, [resultsCache, debouncedQuery]);

	return {
		query,
		setQuery,
		results: query.length >= MIN_CHARS ? results : []
	};
}
