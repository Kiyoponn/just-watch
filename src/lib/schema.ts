import * as z from 'zod'

export const formSchema = z.object({
	watch: z.enum(['movie', 'tv'], {
		required_error:
			'Please select what you want to watch (i.e. Movie or TV Show).'
	}),
	id: z
		.string({
			required_error: 'Enter the ID from IMDb or TMDb.',
			invalid_type_error: 'Entered ID should be a string.'
		})
		.trim()
		.toLowerCase()
		.refine((value) => /^(?!^\s+$).+/.test(value), {
			message: 'Space is not a valid id.'
		})
		.refine((value) => /^(\d+$|^tt\d+)$/.test(value), {
			message: "Invalid id (valid id's are tt1190634 or 569094)."
		}),
	season: z.string().optional(),
	episode: z.string().optional()
})
