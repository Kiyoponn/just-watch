import spriteHref from '/sprite.svg'
import type { IconName } from '@/types/names'
import type { SVGProps } from 'react'

export default function Icon({
	name,
	...props
}: SVGProps<SVGSVGElement> & {
	name: IconName
}) {
	return (
		// rome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg {...props} aria-label={name}>
			<use href={`${spriteHref}#${name}`} />
		</svg>
	)
}
