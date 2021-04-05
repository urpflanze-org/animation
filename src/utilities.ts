import { IConvertedColor, parseColorAndConvert } from '@urpflanze/color'
import { ISimpleAnimation } from './types'

export function interpolateColorRGB(start: IConvertedColor, end: IConvertedColor, offset: number): string {
	const r = start.r + offset * (end.r - start.r)
	const g = start.g + offset * (end.g - start.g)
	const b = start.b + offset * (end.b - start.b)

	const alpha = start.alpha + offset * (end.alpha - start.alpha)

	return `rgba(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)},${alpha})`
}

export function interpolateColorHSL(start: IConvertedColor, end: IConvertedColor, offset: number): string {
	const h = start.h + offset * (end.h - start.h)
	const s = start.s + offset * (end.s - start.s)
	const l = start.l + offset * (end.l - start.l)

	const alpha = start.alpha + offset * (end.alpha - start.alpha)

	return `hsla(${h},${s}%,${l}%,${alpha})`
}

export function toArray(value: number | [number, number]): [number, number] {
	return typeof value === 'number' ? [value, value] : value
}

export function createInterpolationCallback(
	simpleAnimation: ISimpleAnimation
): undefined | ((offset: number) => number | string | Array<number | string>) {
	const from = Array.isArray(simpleAnimation.from) ? simpleAnimation.from : [simpleAnimation.from]
	const to = Array.isArray(simpleAnimation.to) ? simpleAnimation.to : [simpleAnimation.to]
	const round = simpleAnimation.round
	const colorInterpolation = simpleAnimation.colorTransitionMode == 'hue' ? interpolateColorHSL : interpolateColorRGB

	if (from.length !== to.length) return

	const callbacks: Array<(offset: number) => number | string> = []

	for (let i = 0, len = from.length; i < len; i++) {
		if (typeof from[i] !== typeof to[i]) {
			console.warn('[@urpflanze/animation]: `from` and `to` values mismatch')
			return
		} else {
			if (typeof from[i] !== 'string') {
				const a = from[i] as number,
					b = to[i] as number

				callbacks.push(
					typeof round !== 'undefined'
						? (offset: number) => Math.round((a + offset * (b - a)) * round) / round
						: (offset: number) => a + offset * (b - a)
				)
			} else {
				const a = parseColorAndConvert(from[i] as string)
				const b = parseColorAndConvert(to[i] as string)

				if (typeof a !== 'undefined' && typeof b !== 'undefined') {
					callbacks.push((offset: number) => colorInterpolation(a, b, offset))
				}
			}
		}
	}

	return (offset: number) => {
		const values = callbacks.map(c => c(offset))

		return values.length === 1 ? values[0] : values
	}
}
