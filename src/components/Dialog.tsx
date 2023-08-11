import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import type { DialogTriggerProps } from '@radix-ui/react-dialog'

export default function Model({ children, ...props }: DialogTriggerProps) {
	return (
		<Dialog>
			<DialogTrigger {...props}>{children}</DialogTrigger>
			<DialogContent className="py-8 text-left">
				<DialogHeader className="text-left">
					<DialogTitle>How to get the id?</DialogTitle>
					<DialogDescription>
						<ul className="list-disc w-full list-inside mt-4 flex flex-col gap-4">
							<li>
								Go to{' '}
								<a
									href="https://www.imdb.com/"
									target="_blank"
									rel="noreferrer"
									className="underline font-medium text-foreground/80"
								>
									IMDb
								</a>{' '}
								or{' '}
								<a
									href="https://www.themoviedb.org/"
									target="_blank"
									rel="noreferrer"
									className="underline font-medium text-foreground/80"
								>
									TMDB
								</a>
							</li>
							<li>
								For IMDb
								<ul className="ml-4 list-[circle] list-inside">
									<li>
										get the id after the title in url e.g.{' '}
										<a
											href="https://www.imdb.com/title/tt0439572"
											target="_blank"
											rel="noreferrer"
											className="text-foreground/80 hover:underline"
										>
											https://www.imdb.com/title/tt0439572
										</a>{' '}
										the id is <em>tt0439572</em>
									</li>
								</ul>
							</li>
							<li>
								For TMDB
								<ul className="ml-4 list-[circle] list-inside">
									<li>
										get the id after the movie or tv in url e.g.{' '}
										<a
											href="https://www.themoviedb.org/movie/569094-spider-man-across-the-spider-verse"
											target="_blank"
											rel="noreferrer"
											className="text-foreground/80 hover:underline"
										>
											https://www.themoviedb.org/movie/569094
										</a>{' '}
										the id is <em>569094</em>
									</li>
								</ul>
							</li>
						</ul>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
