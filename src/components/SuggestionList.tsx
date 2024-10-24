import React from 'react'
import { Suggestion } from '@@/types/types'

interface SuggestionListProps {
	suggestions: Suggestion[]
	onSelect: (suggestion: Suggestion) => void
	suggestionBoxRef: React.RefObject<HTMLDivElement>
}

const SuggestionList: React.FC<SuggestionListProps> = ({
	suggestions,
	onSelect,
	suggestionBoxRef
}) => {
	return (
		<div
			ref={suggestionBoxRef}
			className='absolute z-10 mt-2 w-full bg-gray-700 border border-gray-500 hover:bg-gray-700  rounded-md shadow-lg max-h-60 overflow-y-auto'
		>
			{suggestions.map((suggestion: Suggestion, index: number) => (
				<div
					key={index}
					onClick={() => onSelect(suggestion)}
					className='cursor-pointer p-2 hover:bg-gray-600 hover:text-gray-500'
				>
					{suggestion.name}
				</div>
			))}
		</div>
	)
}

export default SuggestionList
