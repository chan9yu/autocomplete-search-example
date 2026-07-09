import type { SubmitEvent } from "react";

import { useAutocomplete } from "../hooks/useAutocomplete";
import type { Result } from "../models/autocomplete";
import { getOptionId } from "../utils/getOptionId";
import { ResultDropdown } from "./ResultDropdown";
import { SearchInput } from "./SearchInput";

export function Autocomplete() {
	const {
		query,
		setQuery,
		results,
		isLoading,
		isError,
		isOpen,
		listboxId,
		highlightedIndex,
		highlightedResult,
		handleKeyDown
	} = useAutocomplete();

	const search = (term: string) => {
		if (term.length === 0) return;
		window.alert(`검색: ${term}`);
	};

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		search(highlightedResult?.text ?? query);
	};

	const handleSelect = (result: Result) => {
		search(result.text);
	};

	const activeDescendantId = highlightedResult ? getOptionId(listboxId, highlightedResult.id) : undefined;

	return (
		<form className="autocomplete" onSubmit={handleSubmit}>
			<SearchInput
				query={query}
				setQuery={setQuery}
				onKeyDown={handleKeyDown}
				isOpen={isOpen}
				listboxId={listboxId}
				activeDescendantId={activeDescendantId}
			/>
			{isOpen && (
				<ResultDropdown
					results={results}
					isLoading={isLoading}
					isError={isError}
					listboxId={listboxId}
					highlightedIndex={highlightedIndex}
					onSelect={handleSelect}
				/>
			)}
		</form>
	);
}
