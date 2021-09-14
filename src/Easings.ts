/**
 * Easing functions
 *
 * @category Interpolation
 * @export
 */
export const Easings = {
	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	linear: (timeOrOffset: number, start: number, end: number, duration = 1): number =>
		(end * timeOrOffset) / duration + start,

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	quadraticIn: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration
		return end * timeOrOffset * timeOrOffset + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	quadraticOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration
		return -end * timeOrOffset * (timeOrOffset - 2) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	quadraticInOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration / 2
		if (timeOrOffset < 1) return (end / 2) * timeOrOffset * timeOrOffset + start
		timeOrOffset--
		return (-end / 2) * (timeOrOffset * (timeOrOffset - 2) - 1) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	cubicIn: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration
		return end * timeOrOffset * timeOrOffset * timeOrOffset + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	cubicOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration
		timeOrOffset--
		return end * (timeOrOffset * timeOrOffset * timeOrOffset + 1) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	cubicInOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration / 2
		if (timeOrOffset < 1) return (end / 2) * timeOrOffset * timeOrOffset * timeOrOffset + start
		timeOrOffset -= 2
		return (end / 2) * (timeOrOffset * timeOrOffset * timeOrOffset + 2) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	quarticIn: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration
		return end * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	quarticOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration
		timeOrOffset--
		return -end * (timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset - 1) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	quarticInOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration / 2
		if (timeOrOffset < 1) return (end / 2) * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + start
		timeOrOffset -= 2
		return (-end / 2) * (timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset - 2) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	quinticIn: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration
		return end * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	quinticOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration
		timeOrOffset--
		return end * (timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + 1) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	quinticInOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration / 2
		if (timeOrOffset < 1)
			return (end / 2) * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + start
		timeOrOffset -= 2
		return (end / 2) * (timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + 2) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	sinusoidalIn: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		return -end * Math.cos((timeOrOffset / duration) * (Math.PI / 2)) + end + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	sinusoidalOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		return end * Math.sin((timeOrOffset / duration) * (Math.PI / 2)) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	sinusoidalInOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		return (-end / 2) * (Math.cos((Math.PI * timeOrOffset) / duration) - 1) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	exponentialIn: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		return end * Math.pow(2, 10 * (timeOrOffset / duration - 1)) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	exponentialOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		return end * (-Math.pow(2, (-10 * timeOrOffset) / duration) + 1) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	exponentialInOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration / 2
		if (timeOrOffset < 1) return (end / 2) * Math.pow(2, 10 * (timeOrOffset - 1)) + start
		timeOrOffset--
		return (end / 2) * (-Math.pow(2, -10 * timeOrOffset) + 2) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	circularIn: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration
		return -end * (Math.sqrt(1 - timeOrOffset * timeOrOffset) - 1) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	circularOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration
		timeOrOffset--
		return end * Math.sqrt(1 - timeOrOffset * timeOrOffset) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @returns {number}
	 */
	circularInOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		timeOrOffset /= duration / 2
		if (timeOrOffset < 1) return (-end / 2) * (Math.sqrt(1 - timeOrOffset * timeOrOffset) - 1) + start
		timeOrOffset -= 2
		return (end / 2) * (Math.sqrt(1 - timeOrOffset * timeOrOffset) + 1) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @param {number} amplitude (optional)
	 * @param {number} period (optional)
	 * @return {number}
	 */
	elasticIn: (timeOrOffset: number, start: number, end: number, duration = 1, amplitude = 1, period = 0.5): number => {
		if (timeOrOffset === 0) {
			return start
		}
		if ((timeOrOffset /= duration) === 1) {
			return start + end
		}

		period *= duration
		let s = 0
		if (amplitude < Math.abs(end)) {
			amplitude = end
			s = period / 4
		} else {
			s = (period / (2 * Math.PI)) * Math.asin(end / amplitude)
		}

		return (
			-(
				amplitude *
				Math.pow(2, 10 * (timeOrOffset -= 1)) *
				Math.sin(((timeOrOffset * duration - s) * (2 * Math.PI)) / period)
			) + start
		)
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @param {number} amplitude (optional)
	 * @param {number} period (optional)
	 * @return {number}
	 */
	elasticOut: (timeOrOffset: number, start: number, end: number, duration = 1, amplitude = 1, period = 0.5): number => {
		if (timeOrOffset === 0) {
			return start
		}
		if ((timeOrOffset /= duration) === 1) {
			return start + end
		}

		period *= duration
		let s = 0
		if (amplitude < Math.abs(end)) {
			amplitude = end
			s = period / 4
		} else {
			s = (period / (2 * Math.PI)) * Math.asin(end / amplitude)
		}

		return (
			amplitude * Math.pow(2, -10 * timeOrOffset) * Math.sin(((timeOrOffset * duration - s) * (2 * Math.PI)) / period) +
			end +
			start
		)
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @param {number} amplitude (optional)
	 * @param {number} period (optional)
	 * @return {number}
	 */
	elasticInOut: (
		timeOrOffset: number,
		start: number,
		end: number,
		duration = 1,
		amplitude = 1,
		period = 0.5
	): number => {
		if (timeOrOffset === 0) {
			return start
		}

		if ((timeOrOffset /= duration / 2) === 2) {
			return start + end
		}

		period *= duration
		let s = 0
		if (amplitude < Math.abs(end)) {
			amplitude = end
			s = period / 4
		} else {
			s = (period / (2 * Math.PI)) * Math.asin(end / amplitude)
		}

		if (timeOrOffset < 1) {
			return (
				-0.5 *
					(amplitude *
						Math.pow(2, 10 * (timeOrOffset -= 1)) *
						Math.sin(((timeOrOffset * duration - s) * (2 * Math.PI)) / period)) +
				start
			)
		}
		return (
			amplitude *
				Math.pow(2, -10 * (timeOrOffset -= 1)) *
				Math.sin(((timeOrOffset * duration - s) * (2 * Math.PI)) / period) *
				0.5 +
			end +
			start
		)
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @param {number} overshoot (optional)
	 * @return {number}
	 */
	backIn: (timeOrOffset: number, start: number, end: number, duration = 1, overshoot = 1.70158): number => {
		return end * (timeOrOffset /= duration) * timeOrOffset * ((overshoot + 1) * timeOrOffset - overshoot) + start
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @param {number} s overshoot (optional)
	 * @return {number}
	 */
	backOut: (timeOrOffset: number, start: number, end: number, duration = 1, overshoot = 1.70158): number => {
		return (
			end *
				((timeOrOffset = timeOrOffset / duration - 1) * timeOrOffset * ((overshoot + 1) * timeOrOffset + overshoot) +
					1) +
			start
		)
	},

	/**
	 * @param {number} timeOrOffset current time
	 * @param {number} start start value
	 * @param {number} end end value
	 * @param {number} duration duration
	 * @param {number} overshoot (optional)
	 * @return {number}
	 */
	backInOut: (timeOrOffset: number, start: number, end: number, duration = 1, overshoot = 1.70158): number => {
		if ((timeOrOffset /= duration / 2) < 1) {
			return (end / 2) * (timeOrOffset * timeOrOffset * (((overshoot *= 1.525) + 1) * timeOrOffset - overshoot)) + start
		}
		return (
			(end / 2) * ((timeOrOffset -= 2) * timeOrOffset * (((overshoot *= 1.525) + 1) * timeOrOffset + overshoot) + 2) +
			start
		)
	},

	/**
	 * @param {number} t current time
	 * @param {number} b start value
	 * @param {number} c end value
	 * @param {number} d duration
	 * @return {number}
	 */
	bounceIn: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		return end - Easings.bounceOut(duration - timeOrOffset, 0, end, duration) + start
	},

	/**
	 * @param {number} t current time
	 * @param {number} b start value
	 * @param {number} c end value
	 * @param {number} d duration
	 * @return {number}
	 */
	bounceOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		if ((timeOrOffset /= duration) < 1 / 2.75) {
			return end * (7.5625 * timeOrOffset * timeOrOffset) + start
		} else if (timeOrOffset < 2 / 2.75) {
			return end * (7.5625 * (timeOrOffset -= 1.5 / 2.75) * timeOrOffset + 0.75) + start
		} else if (timeOrOffset < 2.5 / 2.75) {
			return end * (7.5625 * (timeOrOffset -= 2.25 / 2.75) * timeOrOffset + 0.9375) + start
		}
		return end * (7.5625 * (timeOrOffset -= 2.625 / 2.75) * timeOrOffset + 0.984375) + start
	},

	/**
	 *
	 *
	 * @param {number} time
	 * @param {number} start
	 * @param {number} end
	 * @param {number} duration
	 * @returns
	 */
	bounceInOut: (timeOrOffset: number, start: number, end: number, duration = 1): number => {
		if (timeOrOffset < duration / 2) {
			return Easings.bounceIn(timeOrOffset * 2, 0, end, duration) * 0.5 + start
		}
		return Easings.bounceOut(timeOrOffset * 2 - duration, 0, end, duration) * 0.5 + end * 0.5 + start
	},
}
