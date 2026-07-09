import type { ChangeEvent, KeyboardEvent } from "react";

type SearchInputProps = {
	query: string;
	setQuery: (value: string) => void;
	onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
	isOpen: boolean;
	listboxId: string;
	activeDescendantId?: string;
};

export function SearchInput({ query, setQuery, onKeyDown, isOpen, listboxId, activeDescendantId }: SearchInputProps) {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	return (
		<input
			className="search-input"
			placeholder="검색어를 입력하세요"
			aria-label="검색어"
			value={query}
			onChange={handleChange}
			onKeyDown={onKeyDown}
			role="combobox"
			aria-autocomplete="list"
			aria-expanded={isOpen}
			aria-controls={isOpen ? listboxId : undefined}
			aria-activedescendant={activeDescendantId}
		/>
	);
}
