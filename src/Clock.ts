const PI2 = Math.PI * 2

/**
 *
 *
 * @export
 * @param {number} time Current time
 * @param {number} duration Clock duration
 * @param {(number | boolean)} [loop=true]
 * @param {('normal' | 'reverse' | 'alternate')} [direction='alternate']
 * @param {number} [delay=0]
 * @param {number} [afterDelay=0]
 * @return {*}  {number}
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
