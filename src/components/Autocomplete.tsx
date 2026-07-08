import { useAutocomplete } from "../hooks/useAutocomplete";
import { ResultDropdown } from "./ResultDropdown";
import { SearchInput } from "./SearchInput";

export function Autocomplete() {
	const { query, setQuery, results, isLoading, isError, isOpen } = useAutocomplete();

	return (
		<div className="autocomplete">
			<SearchInput query={query} setQuery={setQuery} />
			{isOpen && <ResultDropdown results={results} isLoading={isLoading} isError={isError} />}
		</div>
	);
}
