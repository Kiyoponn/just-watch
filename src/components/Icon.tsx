import type { SVGProps } from 'react'
import spriteHref from '/sprite.svg'
import type { IconName } from '@/types/names'

export default function Icon({
	name,
	...props
}: SVGProps<SVGSVGElement> & {
	name: IconName
}) {
	return (
		<svg {...props}>
			<title>{name}</title>
			<use href={`${spriteHref}#${name}`} />
		</svg>
	)
}
