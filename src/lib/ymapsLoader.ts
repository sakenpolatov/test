export const loadYandexModules = (): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		if (!window.ymaps) {
			return reject(new Error('Yandex Maps API is not loaded'))
		}

		window.ymaps.modules.require(
			['Map', 'Placemark', 'Clusterer', 'Heatmap'],
			(
				Map: ymaps.Map,
				Placemark: ymaps.Placemark,
				Clusterer: ymaps.Clusterer,
				Heatmap: ymaps.Heatmap
			) => {
				resolve([Map, Placemark, Clusterer, Heatmap])
			},
			(err: Error) => {
				reject(err)
			}
		)
	})
}
