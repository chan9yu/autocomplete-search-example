import type { Result } from "../models/autocomplete";
import { ResultItem } from "./ResultItem";

type ResultDropdownProps = {
	results: Result[];
	isLoading: boolean;
	isError: boolean;
};

export function ResultDropdown({ results, isLoading, isError }: ResultDropdownProps) {
	if (isLoading) {
		return <div className="dropdown dropdown-status">불러오는 중…</div>;
	}

	if (isError) {
		return <div className="dropdown dropdown-status">추천어를 불러오지 못했어요</div>;
	}

	if (results.length === 0) {
		return <div className="dropdown dropdown-status">검색 결과가 없습니다</div>;
	}

	return (
		<ul className="dropdown" role="listbox">
			{results.map((result) => (
				<ResultItem key={result.id} text={result.text} />
			))}
		</ul>
	);
}
