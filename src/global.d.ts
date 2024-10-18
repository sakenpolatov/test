declare global {
	interface Window {
		ymaps: any
		myMap: ymaps.Map | null
	}

	namespace ymaps {
		class Map {
			constructor(container: string | HTMLElement, state: any, options?: any)
			geoObjects: any
			destroy(): void
		}

		class Placemark {
			constructor(coords: number[], properties: any, options?: any)
		}

		class Clusterer {
			constructor(options?: any)
			add(geoObjects: any[]): void
		}

		class Heatmap {
			constructor(data: number[][], options?: any)
			setMap(map: Map): void
		}
	}
}

export {}
