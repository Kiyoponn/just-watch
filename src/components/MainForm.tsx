import { Button } from './ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './ui/form'
import { Input } from './ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select'
import { formSchema } from '@/lib/schema'
import updateIframe from '@/lib/update-iframe'
import type { formValuesType } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function MainForm() {
	const form = useForm<formValuesType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			watch: 'movie'
		}
	})

	function submit(data: formValuesType) {
		if (!data.season && !data.episode) {
			const params = new URLSearchParams([
				...Object.entries({
					watch: data.watch,
					id: data.id
				})
			]).toString()

			window.history.pushState(null, '', `?${params}`)
		} else {
			const params = new URLSearchParams([...Object.entries(data)]).toString()
			window.history.pushState(null, '', `?${params}`)
		}

		updateIframe()
	}

	return (
		<Form {...form}>
			<form
				id='details-form'
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
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className='w-full'>
										<SelectValue />
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
								<Input type='text' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.watch('watch') === 'tv' ? (
					<>
						<FormField
							control={form.control}
							name='season'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Season (Optional)</FormLabel>
									<FormControl>
										<Input type='number' min={1} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='episode'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Episode (Optional)</FormLabel>
									<FormControl>
										<Input type='number' min={1} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				) : null}

				<Button type='submit'>Search</Button>
			</form>
		</Form>
	)
}
