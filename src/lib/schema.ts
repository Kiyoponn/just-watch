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
	season: z
		.number({
			invalid_type_error: 'Entered season number should be a number.'
		})
		.optional(),
	episode: z
		.number({
			invalid_type_error: 'Entered episode number should be a number.'
		})
		.optional()
})
