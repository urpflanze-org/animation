import type { IPropArguments } from '@urpflanze/core'
import { Easings } from './Easings'

//////////////////////////

/**
 * @category Types.Interpolator
 */
export type TEasings = keyof typeof Easings

/**
 * @category Types.Interpolator
 */
export interface TWaveInterpolator {
	type: 'wave'
	params: { phase: number }
}

/**
 * @category Types.Interpolator
 */
export interface TElasticInterpolator {
	type: 'elasticIn' | 'elasticOut' | 'elasticInOut'
	params: { amplitude?: number; period?: number }
}

/**
 * @category Types.Interpolator
 */
export interface TBackInterpolator {
	type: 'backIn' | 'backOut' | 'backInOut'
	params: { overshoot?: number }
}

/**
 * @category Types.Interpolator
 */
export interface TCubicBezierInterpolator {
	type: 'cubicBezier'
	params: [number, number, number, number]
}

/**
 * @category Types.Interpolator
 */
export type TInterpolator =
	| ((elapsedOffset: number, elapsed: number) => number /* between 0 and 1 */)
	| 'wave'
	| TWaveInterpolator
	| TEasings
	| TElasticInterpolator
	| TBackInterpolator
	| TCubicBezierInterpolator

//////////////////////////

/**
 *
 * @category Types.Animation
 * @export
 * @interface ISimpleAnimation
 */
export interface ISimpleAnimation {
	/**
	 * Supported color string format:
	 * rgba([0-255], [0-255], [0-255], 0-1)
	 * hsla([0-360], [0-100]%, [0-100]%, 0-1)
	 * @order 1
	 */
	from: number | string | Array<number | string>

	/**
	 * Supported color string format:
	 * rgba([0-255], [0-255], [0-255], 0-1)
	 * hsla([0-360], [0-100]%, [0-100]%, 0-1)
	 * @order 2
	 */
	to: number | string | Array<number | string>

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
	interpolator?: TInterpolator

	/**
	 * Delay of animation start
	 *
	 * @order 7
	 */
	delay?: number

	/**
	 * Delay after animation end loop
	 *
	 * @order 7
	 */
	afterDelay?: number

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

/**
 * @category Types.Animation
 */
export type TAnimationFunction = (elapsed: number, duration: number) => number

/**
 * @category Types.Animation
 */
export type TInterpolateCallback = (offset: number) => number | string | Array<number | string>

/**
 * @category Types.Animation
 */
export interface TAnimation {
	loop: number
	loopDuration: number
	direction: 'normal' | 'reverse'
	started: boolean
	ended: boolean
	offset: number
	value: undefined | number | string | Array<number | string>
	update: (time: number) => void
}

/**
 * @category Types.Animation
 */
export type TAnimationCallback =
	| ((currentTime: number | IPropArguments) => string | number | Array<string | number> | undefined)
	| undefined
