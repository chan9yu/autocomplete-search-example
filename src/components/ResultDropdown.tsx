import type { Result } from "../models/autocomplete";
import { getOptionId } from "../utils/getOptionId";
import { ResultItem } from "./ResultItem";

type ResultDropdownProps = {
	results: Result[];
	isLoading: boolean;
	isError: boolean;
	listboxId: string;
	highlightedIndex: number;
	onSelect: (result: Result) => void;
};

export function ResultDropdown({
	results,
	isLoading,
	isError,
	listboxId,
	highlightedIndex,
	onSelect
}: ResultDropdownProps) {
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
		<ul className="dropdown" role="listbox" id={listboxId}>
			{results.map((result, index) => (
				<ResultItem
					key={result.id}
					id={getOptionId(listboxId, result.id)}
					text={result.text}
					isHighlighted={index === highlightedIndex}
					onSelect={() => onSelect(result)}
				/>
			))}
		</ul>
	);
}
