import { formSchema } from '@/lib/schema'
import updateIframe from '@/lib/update-iframe'
import { useToast } from '@/lib/use-toast'
import { cn, hasParams } from '@/lib/utils'
import type { formValuesType } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Dialog from './Dialog'
import Icon from './Icon'
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

export default function MainForm() {
	const form = useForm<formValuesType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			watch: 'movie'
		}
	})

	const { toast } = useToast()

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

	function copyToClipboard() {
		try {
			const url = new URL(window.location.href).toString()
			navigator.clipboard.writeText(url)

			toast({
				variant: 'successful',
				description: 'Copied to clipboard.'
			})
		} catch (error) {
			import.meta.env.DEV && console.log(error)

			toast({
				variant: 'destructive',
				description: 'Something went wrong! Please try again.'
			})
		}
	}

	const { errors, isSubmitting } = form.formState

	return (
		<>
			<Form {...form}>
				<form
					id="details-form"
					className="flex flex-col gap-6"
					onSubmit={form.handleSubmit(submit)}
				>
					<FormField
						control={form.control}
						name="watch"
						render={({ field }) => (
							<FormItem>
								<FormLabel>What you want to watch?</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className="w-full">
											<SelectValue />
										</SelectTrigger>
										<SelectContent
											className={cn(
												errors?.watch &&
													'focus-visible:ring-destructive-foreground'
											)}
										>
											<SelectItem value="movie">Movies</SelectItem>
											<SelectItem value="tv">TV Shows</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="id"
						render={({ field }) => (
							<FormItem>
								<div className="flex gap-2 items-center">
									<FormLabel className="flex gap-2 items-center">
										Enter ID
									</FormLabel>

									<Dialog className="inline-block min-[330px]:hidden">
										<Icon name="help-circle" className="h-4 w-4" />
									</Dialog>
								</div>
								<FormControl>
									<Input
										type="text"
										className={cn(
											errors?.id && 'focus-visible:ring-destructive-foreground'
										)}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{form.watch('watch') === 'tv' ? (
						<>
							<FormField
								control={form.control}
								name="season"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Season (Optional)</FormLabel>
										<FormControl>
											<Input type="number" min={1} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="episode"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Episode (Optional)</FormLabel>
										<FormControl>
											<Input type="number" min={1} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					) : null}

					<div className="flex flex-col gap-2 sm:gap-4 sm:flex-row">
						<Button disabled={isSubmitting} type="submit" className="w-full">
							Search
						</Button>
						<Button
							type="button"
							disabled={hasParams()}
							className="w-full"
							variant={'outline'}
							onClick={() => {
								copyToClipboard()
							}}
							onKeyDown={(e) => {
								if (e.key === ' ' || e.key === 'enter') copyToClipboard()
							}}
						>
							Share
						</Button>
					</div>
				</form>
			</Form>
		</>
	)
}
