export interface IMarker {
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

export interface ICoordinates {
	latitude: number | null
	longitude: number | null
}

export interface IFormData {
	type: string
	location: string
	source: string
	comment: string
}

export interface GeoObject {
	Point: {
		pos: string // Координаты в строковом формате
	}
	name: string // Имя места
}

export interface GeoObjectCollection {
	featureMember: {
		GeoObject: GeoObject
	}[]
}

export interface GeocoderResponse {
	response: {
		GeoObjectCollection: GeoObjectCollection
	}
}

export interface Suggestion {
	name: string
	coordinates: [number, number]
}
