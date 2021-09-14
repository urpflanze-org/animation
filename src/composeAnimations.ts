import { parseColorAndConvert } from '@urpflanze/color'
import { createAnimation } from './createAnimation'
import { ISimpleAnimation, TAnimation } from './types'
import { interpolateColorRGB } from './utilities'

/**
 *
 * @category Utilities
 * @export
 * @param {Array<ISimpleAnimation>} simpleAnimations
 * @return {*}  {(((currentTime: number) => string | number | Array<string | number> | undefined) | undefined)}
 */
export function composeAnimations(
	simpleAnimations: Array<ISimpleAnimation>
): ((currentTime: number) => string | number | Array<string | number> | undefined) | undefined {
	const animations = simpleAnimations.map(createAnimation).filter(a => typeof a !== 'undefined') as Array<TAnimation>
	const animationsLength = animations.length

	if (animationsLength > 0) {
		return (currentTime: number): string | number | Array<string | number> | undefined => {
			let value: string | number | Array<string | number> | undefined = undefined

			for (let i = 0; i < animationsLength; i++) {
				const animation = animations[i]
				animation.update(currentTime)
				value = typeof value === 'undefined' ? animation.value : interpolate(value!, animation.value!)
			}

			return value
		}
	}
}

function interpolate(
	a: string | number | Array<string | number>,
	b: string | number | Array<string | number>,
	offset = 0.5
): string | number | Array<string | number> | undefined {
	const from = Array.isArray(a) ? a : [a]
	const to = Array.isArray(b) ? b : [b]

	const results = []

	for (let i = 0, len = from.length; i < len; i++) {
		if (typeof from[i] !== typeof to[i]) {
			console.error('[@urpflanze/animation]: cannot interpolate')
			return undefined
		} else {
			if (typeof from[i] !== 'string') {
				const a = from[i] as number,
					b = to[i] as number

				results.push(a + offset * (b - a))
			} else {
				const a = from[i] as string
				const b = to[i] as string
				const parsed_a = parseColorAndConvert(a)
				const parsed_b = parseColorAndConvert(b)

				if (typeof parsed_a !== 'undefined' && typeof parsed_b !== 'undefined') {
					results.push(interpolateColorRGB(parsed_a, parsed_b, offset))
				}
			}
		}
	}

	return results.length === 1 ? results[0] : results
}
