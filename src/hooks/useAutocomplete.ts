import { useEffect, useState } from "react";

import type { Result } from "../models/autocomplete";
import { fetchAutocomplete } from "../services/fetchAutocomplete";

export function useAutocomplete() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Result[]>([]);

	useEffect(() => {
		fetchAutocomplete(query).then((fetched) => fetched && setResults(fetched));
	}, [query]);

	return {
		query,
		setQuery,
		results
	};
}
