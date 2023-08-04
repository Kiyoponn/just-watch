import { Button } from './ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select'
import { useForm } from 'react-hook-form'
import type { formValuesType } from '@/types/form'
import { formSchema } from '@/lib/schema'
import { Input } from './ui/input'

export default function MainForm() {
	const form = useForm<formValuesType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			watch: 'movie'
		}
	})

	function submit() {}

	return (
		<Form {...form}>
			<form
				className='flex flex-col gap-6'
				onSubmit={form.handleSubmit(submit)}
			>
				<FormField
					control={form.control}
					name='watch'
					render={({ field }) => (
						<FormItem>
							<FormLabel>What you want to watch?</FormLabel>
							<FormControl>
								<Select>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select a value' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='movie'>Movies</SelectItem>
										<SelectItem value='tv'>TV Shows</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='id'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter ID</FormLabel>
							<FormControl>
								<Input type='text' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button>Search</Button>
			</form>
		</Form>
	)
}
