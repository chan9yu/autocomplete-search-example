import { useAutocomplete } from "../hooks/useAutocomplete";
import { ResultDropdown } from "./ResultDropdown";
import { SearchInput } from "./SearchInput";

export function Autocomplete() {
	useAutocomplete();

	return (
		<div>
			<SearchInput />
			<ResultDropdown />
		</div>
	);
}
