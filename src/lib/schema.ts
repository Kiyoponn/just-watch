import * as z from 'zod'

export const formSchema = z.object({
	watch: z.enum(['movie', 'tv'], {
		required_error:
			'Please select what you want to watch (i.e. Movie or TV Show).'
	}),
	id: z
		.string({
			required_error: 'Enter the ID from or TMDb.',
			invalid_type_error: 'Entered ID should be a string.'
		})
		.min(1, {
			message: 'Entered ID should be greater than 1 character.'
		})
		.trim()
		.toLowerCase(),
	season: z.string().optional(),
	episode: z.string().optional()
})
