import type { Result } from "../models/autocomplete";
import { ResultItem } from "./ResultItem";

type ResultDropdownProps = {
	results: Result[];
};

export function ResultDropdown({ results }: ResultDropdownProps) {
	return (
		<ul className="dropdown" role="listbox">
			{results.map((result) => (
				<ResultItem key={result.id} text={result.text} />
			))}
		</ul>
	);
}
