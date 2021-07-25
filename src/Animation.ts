import type { IPropArguments } from '@urpflanze/core'
import { composeAnimations } from './composeAnimations'
import { createAnimation } from './createAnimation'
import { ISimpleAnimation, TAnimationCallback } from './types'

export function resolveSimpleAnimation(simpleAnimation: ISimpleAnimation): TAnimationCallback | undefined {
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

// Alias
export const Simple = resolveSimpleAnimation

// Compose multiple animations
export const Compose = (animations: Array<ISimpleAnimation>) => {
	const composed = composeAnimations(animations)

	if (composed) {
		return (
			propArgumentsOrCurrentTime: IPropArguments | number
		): string | number | Array<string | number> | undefined => {
			const currentTime: number =
				typeof propArgumentsOrCurrentTime === 'number'
					? propArgumentsOrCurrentTime
					: propArgumentsOrCurrentTime.shape.scene?.currentTime || 0

			return composed(currentTime)
		}
	}
}

export const Loop = (loopAnimation: Omit<ISimpleAnimation, 'direction' | 'loop'>): TAnimationCallback | undefined => {
	const simpleAnimation: ISimpleAnimation = loopAnimation

	if (typeof simpleAnimation.interpolator === 'undefined') {
		simpleAnimation.interpolator = 'wave'
	}

	if (simpleAnimation.interpolator) {
		if (typeof simpleAnimation.interpolator === 'string') {
			if (simpleAnimation.interpolator !== 'wave') {
				simpleAnimation.direction = 'alternate'
			}
		} else if (typeof simpleAnimation.interpolator === 'object' && simpleAnimation.interpolator.type !== 'wave') {
			simpleAnimation.direction = 'alternate'
		}
	}

	simpleAnimation.loop = true

	return resolveSimpleAnimation(simpleAnimation)
}

export const Static = (staticAnimation: Omit<ISimpleAnimation, 'direction' | 'loop'>) => {
	const simpleAnimation: ISimpleAnimation = staticAnimation

	simpleAnimation.direction = 'normal'
	simpleAnimation.loop = false

	return resolveSimpleAnimation(simpleAnimation)
}

export const UncontrolledLoop = (uncontrolledLoopAnimation: Omit<ISimpleAnimation, 'direction' | 'loop'>) => {
	const simpleAnimation: ISimpleAnimation = uncontrolledLoopAnimation

	simpleAnimation.direction = 'normal'
	simpleAnimation.loop = true

	return resolveSimpleAnimation(simpleAnimation)
}
