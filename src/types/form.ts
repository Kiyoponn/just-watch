import type { formSchema } from '@/lib/schema'
import type * as z from 'zod'

export type formValuesType = z.infer<typeof formSchema>
