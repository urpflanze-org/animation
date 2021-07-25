import { IConvertedColor } from '@urpflanze/color'

/**
 * Return time (from 0 to duration) in milliseconds
 *
 * @export
 * @param {number} time Current time
 * @param {number} duration Clock duration
 * @param {(number | boolean)} [loop=true]
 * @param {('normal' | 'reverse' | 'alternate')} [direction='alternate']
 * @param {number} [delay=0]
 * @param {number} [afterDelay=0]
 * @return {*}  {number} Between 0 and duration
 */
export function clock(
	time: number,
	duration: number,
	loop: number | boolean = true,
	direction: 'normal' | 'reverse' | 'alternate' = 'alternate',
	delay = 0,
	afterDelay = 0
): number {
	const totalDuration =
		direction === 'normal'
			? duration + delay
			: direction === 'reverse'
			? duration + delay
			: duration * 2 + delay + afterDelay

	if ((typeof loop === 'number' && time >= totalDuration * loop) || (loop === false && time >= totalDuration)) {
		return direction === 'normal' ? duration : 0
	}

	time %= totalDuration

	if ((time -= delay) <= 0) {
		return 0
	}

	if (direction === 'alternate') {
		if (time <= duration) {
			// normal
			return time
		} else {
			// reverse
			time -= duration
			if ((time -= afterDelay) >= 0) {
				return duration - (time >= duration ? duration : time)
			}
			return duration
		}
	} else {
		return time >= duration ? duration : time
	}
}

/**
 * Return offset between 0 and 1 from current time based on duration and other parameters
 *
 * @export
 * @param {number} time
 * @param {number} duration
 * @param {(number | boolean)} [loop=true]
 * @param {('normal' | 'reverse' | 'alternate')} [direction='alternate']
 * @param {number} [delay=0]
 * @param {number} [afterDelay=0]
 * @return {*}  {number}
 */
export function clockOffset(
	time: number,
	duration: number,
	loop: number | boolean = true,
	direction: 'normal' | 'reverse' | 'alternate' = 'alternate',
	delay = 0,
	afterDelay = 0
): number {
	return clock(time, duration, loop, direction, delay, afterDelay) / duration
}

const PI2 = Math.PI * 2

/**
 * Return sin of period 'durate' in time 'time'
 *
 * @export
 * @param {number} time
 * @param {number} durate
 * @param {number} phase
 * @param {boolean} [normalize=false]
 * @return {*}  {number}
 */
export function sinp(time: number, durate: number, phase = 0, normalize = false): number {
	const value = Math.sin((time * PI2) / durate + phase)

	return normalize ? 0.5 + value * 0.5 : value
}

/**
 * Return cos of period 'durate' in time 'time'
 *
 * @export
 * @param {number} time
 * @param {number} durate
 * @param {number} phase
 * @param {boolean} [normalize=false]
 * @return {*}  {number}
 */
export function cosp(time: number, durate: number, phase = 0, normalize = false): number {
	const value = Math.cos((time * PI2) / durate + phase)

	return normalize ? 0.5 + value * 0.5 : value
}

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
