import { IConvertedColor } from '@urpflanze/color'

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
