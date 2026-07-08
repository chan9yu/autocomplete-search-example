import type { AutocompleteResponse } from "../models/autocomplete";

const RESULT_LIMIT = 10;

export async function fetchAutocomplete(query: string, signal?: AbortSignal) {
	const params = new URLSearchParams({ q: query, limit: String(RESULT_LIMIT) });
	const response = await fetch(`/api/autocomplete?${params}`, { signal });
	const data: AutocompleteResponse = await response.json();

	return data.results;
}
