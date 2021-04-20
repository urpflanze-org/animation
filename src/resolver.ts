import type { IPropArguments } from '@urpflanze/core'
import { ISimpleAnimation } from './types'
import { createAnimation } from './Animation'

type TAnimationCallback =
	| ((currentTime: number | IPropArguments) => string | number | Array<string | number> | undefined)
	| undefined

function resolver(
	simpleAnimation: ISimpleAnimation | ((propArguments: IPropArguments) => ISimpleAnimation)
): TAnimationCallback | ((propArguments: IPropArguments) => string | number | Array<string | number> | undefined) {
	if (typeof simpleAnimation === 'function') {
		const lastReturn: Array<string | number | Array<string | number> | undefined> = []

		return (propArguments: IPropArguments) => {
			const animation: TAnimationCallback = resolveSimpleAnimation(simpleAnimation(propArguments))
			if (animation) {
				const t = animation(propArguments.shape.scene!.currentTime)
				if (t) {
					lastReturn[propArguments.repetition.index - 1] = t
				}
			}
			return lastReturn[propArguments.repetition.index - 1]
		}
	}

	return resolveSimpleAnimation(simpleAnimation)
}

function resolveSimpleAnimation(simpleAnimation: ISimpleAnimation): TAnimationCallback {
	const animation = createAnimation(simpleAnimation)

	if (animation) {
		return (
			propArgumentsOrCurrentTime: IPropArguments | number
		): string | number | Array<string | number> | undefined => {
			const currentTime: number =
				typeof propArgumentsOrCurrentTime === 'number'
					? propArgumentsOrCurrentTime
					: propArgumentsOrCurrentTime.shape.scene?.currentTime || 0

			animation.update(currentTime)

			return animation.value
		}
	}
}

export { resolver }
