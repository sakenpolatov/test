export const anchorToMap = (elementId: string, offset: number = 0) => {
	const element = document.getElementById(elementId)
	if (element) {
		const top = element.getBoundingClientRect().top + window.scrollY - offset
		window.scrollTo({ top, behavior: 'smooth' })
	}
}
