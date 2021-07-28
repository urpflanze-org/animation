import type { IPropArguments } from '@urpflanze/core'
import { composeAnimations } from './composeAnimations'
import { createAnimation } from './createAnimation'
import { ISimpleAnimation, TAnimationCallback } from './types'

/**
 * Create animation from ISimpleAnimation.
 *
 * @category Animation
 * @export
 * @param {ISimpleAnimation} simpleAnimation
 * @return {*}  {(TAnimationCallback | undefined)}
 */
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

/**
 * resolveSimpleAnimations alias
 * @export
 * @category Animation
 */
export const Simple = resolveSimpleAnimation

/**
 * Compose multiple animation into one.
 *
 * @category Animation
 * @export
 * @param {Array<ISimpleAnimation>} animations
 * @return {*}  {(TAnimationCallback | undefined)}
 */
export function Compose(animations: Array<ISimpleAnimation>): TAnimationCallback | undefined {
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

/**
 * Create Loop animation.
 *
 * @category Animation
 * @export
 * @param {(Omit<ISimpleAnimation, 'direction' | 'loop'>)} loopAnimation
 * @return {*}  {(TAnimationCallback | undefined)}
 */
export function Loop(loopAnimation: Omit<ISimpleAnimation, 'direction' | 'loop'>): TAnimationCallback | undefined {
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

/**
 * Create an animation that repeats once
 *
 * @category Animation
 * @export
 * @param {(Omit<ISimpleAnimation, 'direction' | 'loop'>)} staticAnimation
 * @return {*}  {(TAnimationCallback | undefined)}
 */
export function Static(staticAnimation: Omit<ISimpleAnimation, 'direction' | 'loop'>): TAnimationCallback | undefined {
	const simpleAnimation: ISimpleAnimation = staticAnimation

	simpleAnimation.direction = 'normal'
	simpleAnimation.loop = false

	return resolveSimpleAnimation(simpleAnimation)
}

/**
 * Create an animation that repeats in a single direction
 *
 * @category Animation
 * @export
 * @param {(Omit<ISimpleAnimation, 'direction' | 'loop'>)} uncontrolledLoopAnimation
 * @return {*}
 */
export function UncontrolledLoop(uncontrolledLoopAnimation: Omit<ISimpleAnimation, 'direction' | 'loop'>) {
	const simpleAnimation: ISimpleAnimation = uncontrolledLoopAnimation

	simpleAnimation.direction = 'normal'
	simpleAnimation.loop = true

	return resolveSimpleAnimation(simpleAnimation)
}
