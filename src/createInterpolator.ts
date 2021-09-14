import { parseColorAndConvert } from '@urpflanze/color'
import BezierEasing from 'bezier-easing'
import { Easings } from './Easings'
import { ISimpleAnimation, TAnimationFunction, TInterpolateCallback, TInterpolator } from './types'
import { interpolateColorHSL, interpolateColorRGB } from './utilities'

/**
 * Return a callback for value interpolation passing offset from 0 to 1
 *
 * @category Interpolation
 * @param simpleAnimation
 * @returns
 */
export function createInterpolationCallback(simpleAnimation: ISimpleAnimation): undefined | TInterpolateCallback {
	const from = Array.isArray(simpleAnimation.from) ? simpleAnimation.from : [simpleAnimation.from]
	const to = Array.isArray(simpleAnimation.to) ? simpleAnimation.to : [simpleAnimation.to]
	const round = simpleAnimation.round
	const colorInterpolation = simpleAnimation.colorTransitionMode === 'hue' ? interpolateColorHSL : interpolateColorRGB

	if (from.length !== to.length) return undefined

	const callbacks: Array<(offset: number) => number | string> = []

	for (let i = 0, len = from.length; i < len; i++) {
		if (typeof from[i] !== typeof to[i]) {
			console.warn('[@urpflanze/animation]: `from` and `to` values mismatch')
			return undefined
		} else {
			if (typeof from[i] !== 'string') {
				const a = from[i] as number,
					b = to[i] as number

				callbacks.push(
					typeof round !== 'undefined'
						? (offset: number) =>
								offset === 1 ? b : offset === 0 ? a : Math.round((a + offset * (b - a)) * round) / round
						: (offset: number) => (offset === 1 ? b : offset === 0 ? a : a + offset * (b - a))
				)
			} else {
				const a = from[i] as string
				const b = to[i] as string
				const parsed_a = parseColorAndConvert(a)
				const parsed_b = parseColorAndConvert(b)

				if (typeof parsed_a !== 'undefined' && typeof parsed_b !== 'undefined') {
					callbacks.push((offset: number) =>
						offset === 1 ? b : offset === 0 ? a : colorInterpolation(parsed_a, parsed_b, offset)
					)
				}
			}
		}
	}

	return (offset: number) => {
		const values = callbacks.map(c => c(offset))
		return values.length === 1 ? values[0] : values
	}
}

/**
 * Return a callback for calculate offset (0 to 1) from elapsed time and animation duration
 *
 * @category Interpolation
 * @param type
 * @returns
 */
export function createInterpolator(type?: TInterpolator): TAnimationFunction {
	switch (typeof type) {
		case 'function':
			return (elapsed: number, duration: number) =>
				(type as (elapsedOffset: number, elapsed: number) => number)(elapsed / duration, elapsed)
		case 'string':
			switch (type) {
				case 'wave':
					return (elapsed: number, duration: number) =>
						0.5 + Math.sin((elapsed * Math.PI * 2) / duration + Math.PI * 1.5) * 0.5
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
				case 'wave': {
					const phase = Math.PI * 1.5 + (type.params?.phase || 0)
					return (elapsed: number, duration: number) => {
						return 0.5 + Math.sin((elapsed * Math.PI * 2) / duration + phase) * 0.5
					}
				}
				case 'elasticIn':
				case 'elasticOut':
				case 'elasticInOut': {
					const easing = Easings[type.type]
					const { amplitude, period } = type.params || {}
					return (elapsed: number, duration: number) => easing(elapsed, 0, 1, duration, amplitude, period)
				}
				case 'backIn':
				case 'backOut':
				case 'backInOut': {
					const easing = Easings[type.type]
					const overshoot = type.params?.overshoot || undefined
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
