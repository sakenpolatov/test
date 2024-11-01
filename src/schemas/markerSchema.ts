import { z } from 'zod'

export const markerSchema = z.object({
	type: z.string(),
	address: z.string(),
	source: z.string(),
	comment: z.string().optional(),
	coordinates: z.object({
		latitude: z.number(),
		longitude: z.number()
	})
})
