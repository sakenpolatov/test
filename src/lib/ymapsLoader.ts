export const loadYandexModules = (): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		if (!window.ymaps) {
			return reject(new Error('Yandex Maps API is not loaded'))
		}

		try {
			window.ymaps.modules.require(
				['Map', 'Placemark', 'Clusterer'],
				(
					Map: typeof window.ymaps.Map,
					Placemark: typeof window.ymaps.Placemark,
					Clusterer: typeof window.ymaps.Clusterer
				) => {
					resolve([Map, Placemark, Clusterer])
				},
				(err: Error) => {
					reject(new Error(`Failed to load Yandex modules: ${err.message}`))
				}
			)
		} catch (err) {
			reject(new Error(`Unexpected error: ${err}`))
		}
	})
}
