import type { AutocompleteResponse } from "../models/autocomplete";

export async function fetchAutocomplete(query: string, signal?: AbortSignal) {
	const encoded = encodeURIComponent(query);
	const url = `/api/autocomplete?q=${encoded}&limit=${10}`;

	const response = await fetch(url, { signal });
	const data: AutocompleteResponse = await response.json();

	return data.results;
}
