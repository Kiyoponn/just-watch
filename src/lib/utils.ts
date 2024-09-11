import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function hasParams() {
	const params = new URLSearchParams(window.location.search)

	if (params.size === 0) {
		return true
	}

	return false
}
