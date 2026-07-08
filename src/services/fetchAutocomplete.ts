import type { AutocompleteResponse } from "../models/autocomplete";

export async function fetchAutocomplete(query: string) {
	const encoded = encodeURIComponent(query);
	const url = `/api/autocomplete?q=${encoded}&limit=${10}`;

	try {
		const response = await fetch(url);
		const data: AutocompleteResponse = await response.json();
		return data.results;
	} catch (error) {
		console.error(error);
		return [];
	}
}
