import type { IPropArguments } from '@urpflanze/core'
import * as BezierEasing from 'bezier-easing'
import { Easings } from './Easings'
import { ISimpleAnimation, TAnimationTypes, TAnimationFunction } from './types'
import { createInterpolationCallback } from './utilities'

type TAnimationCallback =
	| ((currentTime: number | IPropArguments) => string | number | Array<string | number> | undefined)
	| undefined

function resolver(
	simpleAnimation: ISimpleAnimation | ((propArguments: IPropArguments) => ISimpleAnimation)
): TAnimationCallback | ((propArguments: IPropArguments) => string | number | Array<string | number> | undefined) {
	if (typeof simpleAnimation === 'function') {
		let lastReturn: string | number | Array<string | number> | undefined
		return (propArguments: IPropArguments) => {
			const animation: TAnimationCallback = resolveSimpleAnimation(simpleAnimation(propArguments))
			if (animation) {
				const t = animation(propArguments.shape.scene!.currentTime)
				if (t) {
					lastReturn = t
				}
			}
			return lastReturn
		}
	}

	return resolveSimpleAnimation(simpleAnimation)
}

function resolveSimpleAnimation(simpleAnimation: ISimpleAnimation): TAnimationCallback {
	const callback = createInterpolationCallback(simpleAnimation)

	if (callback) {
		let ended = false
		let lastReturn: string | number | Array<string | number> | undefined

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

		const loop = typeof simpleAnimation.loop === 'number' ? simpleAnimation.loop : simpleAnimation.loop

		// let direction: 'normal' | 'reverse' = realDirection === 'alternate' ? 'normal' : realDirection || 'normal'

		const animation = resolveAnimationType(simpleAnimation.easing)

		return (
			propArgumentsOrCurrentTime: IPropArguments | number
		): string | number | Array<string | number> | undefined => {
			if (ended) {
				return lastReturn
			}

			const currentTime: number =
				typeof propArgumentsOrCurrentTime === 'number'
					? propArgumentsOrCurrentTime
					: propArgumentsOrCurrentTime.shape.scene?.currentTime || 0

			let elapsed = currentTime

			if (
				(typeof loop === 'number' && elapsed >= totalDuration * loop) ||
				(loop === false && elapsed >= totalDuration)
			) {
				ended = true
				lastReturn = callback(direction === 'normal' ? 1 : 0)
				return lastReturn // ended
			}

			elapsed = elapsed % totalDuration

			if ((elapsed -= delay) <= 0) {
				lastReturn = callback(0)
				return lastReturn // not started
			}

			if (direction === 'alternate') {
				if (elapsed <= duration + 33) {
					const animationValue = animation(elapsed > duration ? duration : elapsed, duration)
					lastReturn = callback(animationValue)
				} else {
					elapsed -= duration
					if ((elapsed -= afterDelay) <= 0) return lastReturn
					else {
						const animationValue = animation(elapsed > duration ? duration : elapsed, duration)
						lastReturn = callback(1 - animationValue)
					}
				}
				return lastReturn
			} else {
				const animationValue = animation(elapsed > duration ? duration : elapsed, duration)
				lastReturn = direction === 'normal' ? callback(animationValue) : callback(1 - animationValue)
				return lastReturn
			}
		}
	}
}

function resolveAnimationType(type?: TAnimationTypes): TAnimationFunction {
	switch (typeof type) {
		case 'function':
			return (elapsed: number, duration: number) =>
				(type as (elapsedOffset: number, elapsed: number) => number)(elapsed / duration, elapsed)
		case 'string':
			switch (type) {
				case 'sin':
					return (elapsed: number, duration: number) => 0.5 + Math.sin((elapsed * Math.PI * 2) / duration) * 0.5
				case 'cos':
					return (elapsed: number, duration: number) => 0.5 + Math.cos((elapsed * Math.PI * 2) / duration) * 0.5
				default: {
					if (type in Easings) {
						const easing = Easings[type as keyof typeof Easings]
						return (elapsed: number, duration: number) => easing(elapsed, 0, 1, duration)
					}
					return (elapsed: number, duration: number) => Easings.linear(elapsed, 0, 1, duration)
				}
			}
		case 'object':
			switch (type.type) {
				case 'elasticIn':
				case 'elasticOut':
				case 'elasticInOut': {
					const easing = Easings[type.type]
					const { amplitude, period } = type.params
					return (elapsed: number, duration: number) => easing(elapsed, 0, 1, duration, amplitude, period)
				}
				case 'backIn':
				case 'backOut':
				case 'backInOut': {
					const easing = Easings[type.type]
					const overshoot = type.params.overshoot
					return (elapsed: number, duration: number) => easing(elapsed, 0, 1, duration, overshoot)
				}
				case 'cubicBezier': {
					const easing = BezierEasing(type.params[0], type.params[1], type.params[2], type.params[3])
					return (elapsed: number, duration: number) => easing(elapsed / duration)
				}
			}
	}

	return (elapsed: number, duration: number) => Easings.linear(elapsed, 0, 1, duration)
}

export { resolver }
