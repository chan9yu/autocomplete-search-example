import type { ChangeEvent } from "react";

type SearchInputProps = {
	query: string;
	setQuery: (query: string) => void;
};

export function SearchInput({ query, setQuery }: SearchInputProps) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return <input className="search-input" placeholder="검색어를 입력하세요" value={query} onChange={handleChange} />;
}
