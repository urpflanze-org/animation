import { ISimpleAnimation, TAnimation, TAnimationFunction, TInterpolateCallback } from './types'
import { createInterpolationCallback, resolveAnimationType } from './utilities'

interface TBindedAnimationValues {
	delay: number
	afterDelay: number
	direction: 'normal' | 'reverse' | 'alternate'
	duration: number
	totalDuration: number
	loop: number | boolean
}

export function createAnimation(simpleAnimation: ISimpleAnimation): TAnimation | undefined {
	const interpolate = createInterpolationCallback(simpleAnimation)

	if (typeof interpolate === 'undefined') return undefined

	const delay = simpleAnimation.delay || 0
	const afterDelay = simpleAnimation.afterDelay || 0
	const direction = simpleAnimation.direction || 'normal'
	const duration = simpleAnimation.duration || 1000
	const totalDuration =
		direction === 'normal'
			? duration + delay
			: direction === 'reverse'
			? duration + delay
			: duration * 2 + delay + afterDelay

	const loop = typeof simpleAnimation.loop === 'number' ? simpleAnimation.loop : !!simpleAnimation.loop

	const bindedValues: TBindedAnimationValues = {
		delay,
		afterDelay,
		direction,
		duration,
		totalDuration,
		loop,
	}

	const animationFunction = resolveAnimationType(simpleAnimation.easing)

	const animation: Omit<TAnimation, 'update'> = {
		loop: 0,
		offset: 0,
		loopDuration: totalDuration,
		direction: direction === 'alternate' ? 'normal' : direction,
		started: false,
		ended: false,
		value: undefined,
	}

	;(animation as TAnimation).update = createUpdate(animation, bindedValues, animationFunction, interpolate)

	return animation as TAnimation
}

function createUpdate(
	animation: Omit<TAnimation, 'update'>,
	bindedValues: TBindedAnimationValues,
	animationFunction: TAnimationFunction,
	interpolate: TInterpolateCallback
): (time: number) => void {
	const { loop, totalDuration, delay, afterDelay, direction, duration } = bindedValues

	return (time: number) => {
		// Check animation is ended
		if (
			(typeof loop === 'number' && time >= totalDuration * loop) ||
			(loop === false && time >= bindedValues.totalDuration)
		) {
			animation.started = false
			animation.ended = true
			animation.offset = animationFunction(direction === 'normal' ? duration : 0, duration)
			animation.value = interpolate(animation.offset)
			return
		}

		animation.loop = Math.ceil(time / totalDuration)
		time %= totalDuration

		if ((time -= delay) <= 0) {
			animation.started = false
			animation.offset = animationFunction(0, duration)
			animation.value = interpolate(0)
			return
		}

		animation.started = true

		if (direction === 'alternate') {
			if (time <= duration) {
				animation.direction = 'normal'
				// animation.offset = animationFunction(time > duration ? duration : time, duration)
				animation.offset = animationFunction(time, duration)
			} else {
				animation.direction = 'reverse'
				time -= duration
				// wait afterDelay
				if ((time -= afterDelay) >= 0) {
					animation.offset = 1 - animationFunction(time >= duration ? duration : time, duration)
				} else {
					animation.offset = 1
				}
			}
		} else {
			const animationValue = animationFunction(time >= duration ? duration : time, duration)
			animation.offset = direction === 'normal' ? animationValue : 1 - animationValue
		}

		animation.value = interpolate(animation.offset)
	}
}
