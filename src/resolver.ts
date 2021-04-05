import type { IPropArguments } from '@urpflanze/core'
import * as BezierEasing from 'bezier-easing'
import { Easings } from './Easings'
import { ISimpleAnimation, TAnimationTypes, TAnimationFunction } from './types'
import { createInterpolationCallback } from './utilities'

function resolver(
	simpleAnimation: ISimpleAnimation
): ((currentTime: number) => string | number | Array<string | number> | undefined) | undefined {
	const callback = createInterpolationCallback(simpleAnimation)

	if (callback) {
		let lastReturn: string | number | Array<string | number> | undefined

		const delay = simpleAnimation.delay || 0
		const realDirection = simpleAnimation.direction || 'normal'
		const realDuration = (simpleAnimation.duration || 1000) + delay
		const duration = realDuration * (realDirection === 'alternate' ? 0.5 : 1)

		const loop = simpleAnimation.loop
			? typeof simpleAnimation.loop === 'number'
				? realDirection === 'alternate'
					? simpleAnimation.loop * 2
					: simpleAnimation.loop
				: true
			: false
		let direction: 'normal' | 'reverse' = realDirection === 'alternate' ? 'normal' : realDirection || 'normal'

		const animation = resolveAnimationType(simpleAnimation.easing)

		return (
			propArgumentsOrCurrentTime: IPropArguments | number
		): string | number | Array<string | number> | undefined => {
			const currentTime: number =
				typeof propArgumentsOrCurrentTime === 'number'
					? propArgumentsOrCurrentTime
					: propArgumentsOrCurrentTime.shape.scene?.currentTime || 0

			let elapsed = currentTime

			if (loop) {
				if (typeof loop === 'number' && elapsed >= duration * loop) {
					return lastReturn // ended
				}
			} else if (realDirection === 'alternate' ? elapsed >= realDuration : elapsed >= duration + delay)
				return lastReturn // ended

			elapsed = elapsed % duration

			// console.log(elapsed)

			if ((elapsed -= delay) <= 0) return // not started

			if (realDirection === 'alternate') {
				direction = Math.floor(currentTime / duration) % 2 === 0 ? 'normal' : 'reverse'
			}

			const animationValue = animation(elapsed, duration)
			lastReturn = direction === 'normal' ? callback(animationValue) : callback(1 - animationValue)
			return lastReturn
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
				case 'spring': {
					const mass = type.params.mass || 1
					const stiffness = type.params.stiffness || 100
					const damping = type.params.damping || 10
					const velocity = type.params.velocity || 0
					const w0 = Math.sqrt(stiffness / mass)
					const zeta = damping / (2 * Math.sqrt(stiffness * mass))
					const wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0
					const a = 1
					const b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0

					return (elapsed: number, duration: number) => {
						let offset = (duration * (elapsed / duration)) / 1000
						if (zeta < 1) {
							offset = Math.exp(-offset * zeta * w0) * (a * Math.cos(wd * offset) + b * Math.sin(wd * offset))
						} else {
							offset = (a + b * offset) * Math.exp(-offset * w0)
						}
						if (offset === 0 || offset === 1) return offset
						return 1 - offset
					}
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
