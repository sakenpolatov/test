'use client'

import { useEffect } from 'react'

interface ScriptLoaderProps {
	src: string
	onLoad?: () => void
}

const ScriptLoader = ({ src, onLoad }: ScriptLoaderProps) => {
	useEffect(() => {
		const script = document.createElement('script')
		script.src = src
		script.async = true
		script.type = 'text/javascript'

		if (onLoad) {
			script.onload = onLoad
		}

		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
		}
	}, [src, onLoad])

	return null
}

export default ScriptLoader
