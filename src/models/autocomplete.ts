export interface Result {
	id: string;
	text: string;
}

export interface AutocompleteResponse {
	query: string;
	results: Result[];
}
