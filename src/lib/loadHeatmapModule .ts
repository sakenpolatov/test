export const loadHeatmapModule = (): Promise<typeof window.ymaps.Heatmap> => {
	return new Promise((resolve, reject) => {
		if (!window.ymaps) {
			return reject(new Error('Yandex Maps API is not loaded'))
		}

		try {
			window.ymaps.modules.require(
				['Heatmap'],
				(Heatmap: typeof window.ymaps.Heatmap) => {
					if (Heatmap) {
						resolve(Heatmap)
					} else {
						reject(new Error('Failed to load Heatmap module'))
					}
				},
				(err: Error) => {
					reject(new Error(`Failed to load Heatmap module: ${err.message}`))
				}
			)
		} catch (err) {
			reject(new Error(`Unexpected error: ${err}`))
		}
	})
}
