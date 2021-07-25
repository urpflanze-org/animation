<img height="60" src="https://raw.githubusercontent.com/urpflanze-org/core/master/docs/assets/images/logo-for-github.svg">

## Synopsis

This package is used by the [Urpflanze](https://github.com/urpflanze-org/urpflanze) javascript library to create animations.

You can use it in browser or in Node.

The main purpose is to interpolate values based on time.

## Donate

I am trying to create a tool for those who want to approach the world of programming
or for programmers who want to approach the world of creative coding.

I have spent a lot of time and will spend more to support this project.
I also have in mind a **[web editor](https://github.com/urpflanze-org/editor)** (open-source) where you can use the features of this library in the browser.

You can see a preview [here](https://editor.urpflanze.org)

[![](https://img.shields.io/badge/donate-paypal-003087.svg?logo=paypal)](https://www.paypal.me/genbs)
[![](https://img.shields.io/badge/donate-ko--fi-29abe0.svg?logo=ko-fi)](https://ko-fi.com/urpflanze)

[![](https://img.shields.io/badge/bitcoin-1CSQq4aMmsA71twvyZHZCjmeB2AmQGCPNq-f7931a.svg?logo=bitcoin)](https://explorer.btc.com/btc/address/1CSQq4aMmsA71twvyZHZCjmeB2AmQGCPNq)
[![](https://img.shields.io/badge/ethereum-0x9086c4bb7015c1d6dc79162d02e7e1239c982c01-ecf0f1.svg?logo=ethereum)](https://etherscan.io/address/0x9086c4bb7015c1d6dc79162d02e7e1239c982c01)

---

## Menu

- [Synopsis](#synopsis)
- [Donate](#donate)
- [Menu](#menu)
- [Installation](#installation)
- [Create Animation](#create-animation)
	- [Animation parameters](#animation-parameters)
- [Interpolation functions](#interpolation-functions)
	- [Interpolation and Easings](#interpolation-and-easings)
- [Utilities](#utilities)

## Installation

You can install the library with the command:

```bash
npm i @urpflanze/animation --save
```

And import into your project

```javascript
/**
 * Full importing
 */
import * as Animation from '@urpflanze/animation'

const anim = Animation.Simple({ from: 0, to: 100, duration: 1000 })
const value = anim([currentTime])

// Or

const animObj = Animation.createAnimation({ from: 0, to: 100, duration: 1000 })
animObj.update([currentTime])
animObj.value // current animation value
```

Otherwise you can use from the browser using a CDN

```html
<!-- ES Modules -->
<script type="module">
	import * as Animation from 'https://esm.run/@urpflanze/animation'

	//...
</script>

<!-- UMD -->
<script src="https://cdn.jsdelivr.net/npm/@urpflanze/animation"></script>
<script>
	// Animation.[method]
</script>
```

## Create Animation

```javascript
const anim = Animation.Simple({
	from: 0,
	to: 100,
	duration: 1000,
	loop: 2,
})

// total animation duration 2000 (1000 * 2 loop)

console.log(anim(-10)) // 0 (not started)
console.log(anim(0)) // 0 (started)
console.log(anim(500)) // 50 (loop: 1)
console.log(anim(1500)) // 50 (loop: 2)
console.log(anim(2200)) // 100 (ended)
```

### Animation parameters

| Name                | Type                                        | default | Description                                                                        |
| ------------------- | ------------------------------------------- | ------- | ---------------------------------------------------------------------------------- |
| from                | number \| string \| Array<number \| string> | -       | start value                                                                        |
| to                  | number \| string \| Array<number \| string> | -       | end value                                                                          |
| to                  | number \| string \| Array<number \| string> | -       | end value                                                                          |
| duration            | number                                      | 1000    | Animation duration in milliseconds                                                 |
| direction           | normal \| reverse \| alternate              | normal  | Direction of animation. Alternate goes from 'from' to 'to' and from 'to' to 'from' |
| loop                | number \| boolean                           | false   | Define a number of repetitions                                                     |
| interpolator        | TInterpolator                               |         | Type of value interpolation                                                        |
| delay               | number                                      | 0       | Delay of animation start                                                           |
| afterDelay          | number                                      | 0       | Delay after animation end loop                                                     |
| round               | number                                      |         | decimal to be rounded                                                              |
| colorTransitionMode | hue \| rgb                                  | rgb     | color interpolation mode (from and to)                                             |

## Interpolation functions

You can pass the `interpolator` property as a string or as an object to pass parameters:

```javascript
const animElastic = Animation.Simple({
	from: 0,
	to: 100,
	duration: 1000,
	interpolator: 'elasticOut',
})

const animElasticWithParams = Animation.Simple({
	from: 0,
	to: 100,
	duration: 1000,
	interpolator: {
		type: 'elasticOut',
		params: {
			amplitude: 2,
		},
	},
})
```

### Interpolation and Easings

| Name             | Params            |
| ---------------- | ----------------- |
| wave             | phase             |
| cubicBezier      | x1, x2, y1, y2    |
| linear           |                   |
| quadraticIn      |                   |
| quadraticOut     |                   |
| quadraticInOut   |                   |
| cubicIn          |                   |
| cubicOut         |                   |
| cubicInOut       |                   |
| quarticIn        |                   |
| quarticOut       |                   |
| quarticInOut     |                   |
| quinticIn        |                   |
| quinticOut       |                   |
| quinticInOut     |                   |
| sinusoidalIn     |                   |
| sinusoidalOut    |                   |
| sinusoidalInOut  |                   |
| exponentialIn    |                   |
| exponentialOut   |                   |
| exponentialInOut |                   |
| circularIn       |                   |
| circularOut      |                   |
| circularInOut    |                   |
| bounceIn         |                   |
| bounceOut        |                   |
| bounceInOut      |                   |
| backIn           | overshoot         |
| backOut          | overshoot         |
| backInOut        | overshoot         |
| elasticIn        | amplitude, period |
| elasticOut       | amplitude, period |
| elasticInOut     | amplitude, period |

## Utilities

For more complex animations you can use utility methods:

```javascript
import { clock, clockOffset, Easings } from '@urpflanze/animation'

requestAnimationFrame(time => {
	// from 0 to 1000 and from 1000 to 0, total duration 2000ms (loop)
	const animationTime = clock(time, 1000, true, 'alternate')
	const value = Easings.bounceOut(animationTime, 100, 200, 1000)

	// or
	// const animationTimeOffset = clockOffset(time, 1000, true, 'alternate')
	// const value = Easings.bounceOut(animationTimeOffset, 100, 200)
})
```
