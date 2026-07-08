import { useAutocomplete } from "../hooks/useAutocomplete";
import { ResultDropdown } from "./ResultDropdown";
import { SearchInput } from "./SearchInput";

export function Autocomplete() {
	const { query, setQuery, results } = useAutocomplete();

	return (
		<div className="autocomplete">
			<SearchInput query={query} setQuery={setQuery} />
			{!!results.length && <ResultDropdown results={results} />}
		</div>
	);
}
