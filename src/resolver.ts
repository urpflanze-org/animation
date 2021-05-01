import type { IPropArguments } from '@urpflanze/core'
import { createAnimation } from './Animation'
import { ISimpleAnimation, TAnimation, TAnimationCallback } from './types'

// function composeAnimations(animations: Array<ISimpleAnimation | ((propArguments: IPropArguments) => ISimpleAnimation)>) {

// 	const binded: Array<TAnimation> = []

// 	animations.forEach((e, i) => {
// 		binded[i]
// 	})

// 	return (propArguments: IPropArguments) => {

// 	}
// }

function resolver(
	simpleAnimation: ISimpleAnimation | ((propArguments: IPropArguments) => ISimpleAnimation)
): TAnimationCallback | ((propArguments: IPropArguments) => string | number | Array<string | number> | undefined) {
	if (typeof simpleAnimation === 'function') {
		const animations: Array<TAnimation | null> = []

		return (propArguments: IPropArguments) => {
			if (typeof animations[propArguments.repetition.index - 1] === 'undefined') {
				const animation = createAnimation(simpleAnimation(propArguments))
				animations[propArguments.repetition.index - 1] = typeof animation === 'undefined' ? null : animation
			}

			const animation: TAnimation | null = animations[propArguments.repetition.index - 1]

			if (animation !== null) {
				animation.update(propArguments.shape.scene?.currentTime || 0)
				return animation.value
			}
		}
	}

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

// function resolver(
// 	simpleAnimation: ISimpleAnimation | ((propArguments: IPropArguments) => ISimpleAnimation)
// ): TAnimationCallback | ((propArguments: IPropArguments) => string | number | Array<string | number> | undefined) {
// 	if (typeof simpleAnimation === 'function') {
// 		const animations: Array<TAnimation | null> = []

// 		return (propArguments: IPropArguments) => {
// 			if (typeof animations[propArguments.repetition.index - 1] === 'undefined') {
// 				const animation = createAnimation(simpleAnimation(propArguments))
// 				animations[propArguments.repetition.index - 1] = typeof animation === 'undefined' ? null : animation
// 			}

// 			const animation: TAnimation | null = animations[propArguments.repetition.index - 1]

// 			if (animation !== null) {
// 				animation.update(propArguments.shape.scene?.currentTime || 0)
// 				return animation.value
// 			}
// 		}
// 	}

// 	const animation = createAnimation(simpleAnimation)
// 	if (animation) {
// 		return (
// 			propArgumentsOrCurrentTime: IPropArguments | number
// 		): string | number | Array<string | number> | undefined => {
// 			const currentTime: number =
// 				typeof propArgumentsOrCurrentTime === 'number'
// 					? propArgumentsOrCurrentTime
// 					: propArgumentsOrCurrentTime.shape.scene?.currentTime || 0

// 			animation.update(currentTime)

// 			return animation.value
// 		}
// 	}
// }

export { resolver }
