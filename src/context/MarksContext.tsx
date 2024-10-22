import { createContext, useContext, useState, useEffect } from 'react'

export interface Marker {
	_id: string
	type: string
	address: string
	label: string
	description: string
	coordinates: {
		latitude: number
		longitude: number
	}
}

const MarksContext = createContext<{
	marks: Marker[]
	setMarks: React.Dispatch<React.SetStateAction<Marker[]>>
	handleDelete: (id: string) => Promise<void>
	fetchMarks: () => Promise<void>
	currentCoordinates: { latitude: number; longitude: number }[]
	setCurrentCoordinates: React.Dispatch<
		React.SetStateAction<{ latitude: number; longitude: number }[]>
	>
} | null>(null)

export const MarksProvider = ({ children }: any) => {
	const [marks, setMarks] = useState<Marker[]>([])
	const [currentCoordinates, setCurrentCoordinates] = useState<
		{ latitude: number; longitude: number }[]
	>([])

	const fetchMarks = async () => {
		try {
			const res = await fetch('/api/markers')
			const data = await res.json()

			if (res.ok) {
				setMarks(data.markers)
			} else {
				console.error('Ошибка при загрузке меток:', data)
			}
		} catch (error) {
			console.error('Ошибка при загрузке меток:', error)
		}
	}

	const handleDelete = async (id: string) => {
		try {
			const res = await fetch(`/api/markers/${id}`, {
				method: 'DELETE'
			})

			if (res.ok) {
				console.log('Метка успешно удалена')
				setMarks(prevMarks => prevMarks.filter(mark => mark._id !== id))
			} else {
				console.error('Ошибка при удалении метки:', res)
			}
		} catch (error) {
			console.error('Ошибка:', error)
		}
	}

	useEffect(() => {
		fetchMarks()
	}, [])

	return (
		<MarksContext.Provider
			value={{
				marks,
				setMarks,
				handleDelete,
				fetchMarks,
				currentCoordinates,
				setCurrentCoordinates
			}}
		>
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
