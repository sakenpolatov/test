import { createContext, useContext, useState } from 'react'

interface Marker {
	_id: string
	type: string
	address: string
	label: string
	description: string
}

const MarksContext = createContext<{
	marks: Marker[]
	setMarks: React.Dispatch<React.SetStateAction<Marker[]>>
} | null>(null)

export const MarksProvider = ({ children }: any) => {
	const [marks, setMarks] = useState<Marker[]>([])

	return (
		<MarksContext.Provider value={{ marks, setMarks }}>
			{children}
		</MarksContext.Provider>
	)
}

export const useMarks = () => {
	const context = useContext(MarksContext)
	if (!context) {
		throw new Error('useMarks должен использоваться внутри MarksProvider')
	}
	return context
}
