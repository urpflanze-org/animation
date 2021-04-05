import { Easings } from './Easings'

//////////////////////////

/**
 * @internal
 */
interface TTypeEasingElastic {
	type: 'elasticIn' | 'elasticOut' | 'elasticInOut'
	params: { amplitude?: number; period?: number }
}

/**
 * @internal
 */
interface TTypeEasingBack {
	type: 'backIn' | 'backOut' | 'backInOut'
	params: { overshoot?: number }
}

/**
 * @internal
 */
interface TTypeSpring {
	type: 'spring'
	params: {
		mass?: number
		stiffness?: number
		damping?: number
		velocity?: number
	}
}

/**
 * @internal
 */
interface TTypeCubicBezier {
	type: 'cubicBezier'
	params: [number, number, number, number]
}

/**
 * @internal
 */
export type TAnimationTypes =
	| ((elapsedOffset: number, elapsed: number) => number /* between 0 and 1 */)
	| 'sin'
	| 'cos'
	| keyof typeof Easings
	| TTypeEasingElastic
	| TTypeEasingBack
	| TTypeCubicBezier
	| TTypeSpring

//////////////////////////

export interface ISimpleAnimation {
	/**
	 * Supported color string format:
	 * rgba([0-255], [0-255], [0-255], 0-1)
	 * hsla([0-360], [0-100]%, [0-100]%, 0-1)
	 * @order 1
	 */
	from: Array<number | string>

	/**
	 * Supported color string format:
	 * rgba([0-255], [0-255], [0-255], 0-1)
	 * hsla([0-360], [0-100]%, [0-100]%, 0-1)
	 * @order 2
	 */
	to: Array<number | string>

	/**
	 * Duration in millisecond
	 * @order 3
	 */
	duration?: number

	/**
	 * Direction of animation
	 * @order 3
	 */
	direction?: 'normal' | 'reverse' | 'alternate'

	/**
	 * true if animation is loop
	 * number as count of repetitions
	 */
	loop?: boolean | number

	/**
	 * Type of animation
	 */
	easing?: TAnimationTypes

	/**
	 * Delay of start animation
	 *
	 * @order 7
	 */
	delay?: number

	/**
	 * Round value, undefined is no round
	 * 1 = no decimal (int)
	 * 10 = 1 decimal
	 * 100 = 2 decimals
	 *
	 * @order 8
	 */
	round?: number

	/**
	 * With the 'rgb' value the color will vary linearly according to the <mark>mode</mark> and <mark>modeFunction</mark>,
	 * while with 'hue' they will be converted to hsla and then go through the color wheel
	 *
	 * @order 9
	 */
	colorTransitionMode?: 'hue' | 'rgb'
}

export type TAnimationFunction = (elapsed: number, duration: number) => number
