/*!
 * @license Urpflanze Animation v"0.1.1"
 * urpflanze-animation.js
 *
 * Github: https://github.com/urpflanze-org/animation
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Animation"] = factory();
	else
		root["Animation"] = factory();
})(window, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(1), exports);
__exportStar(__webpack_require__(2), exports);
__exportStar(__webpack_require__(3), exports);
__exportStar(__webpack_require__(4), exports);
__exportStar(__webpack_require__(11), exports);
__exportStar(__webpack_require__(12), exports);
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.interpolateColorHSL = exports.interpolateColorRGB = exports.cosp = exports.sinp = exports.clockOffset = exports.clock = void 0;
/**
 * Return time (from 0 to duration) in milliseconds
 *
 * @category Utilities
 * @export
 * @param {number} time Current time
 * @param {number} duration Clock duration
 * @param {(number | boolean)} [loop=true]
 * @param {('normal' | 'reverse' | 'alternate')} [direction='alternate']
 * @param {number} [delay=0]
 * @param {number} [afterDelay=0]
 * @return {*}  {number} Between 0 and duration
 */
function clock(time, duration, loop = true, direction = 'alternate', delay = 0, afterDelay = 0) {
    const totalDuration = direction === 'normal'
        ? duration + delay
        : direction === 'reverse'
            ? duration + delay
            : duration * 2 + delay + afterDelay;
    if ((typeof loop === 'number' && time >= totalDuration * loop) || (loop === false && time >= totalDuration)) {
        return direction === 'normal' ? duration : 0;
    }
    time %= totalDuration;
    if ((time -= delay) <= 0) {
        return 0;
    }
    if (direction === 'alternate') {
        if (time <= duration) {
            // normal
            return time;
        }
        else {
            // reverse
            time -= duration;
            if ((time -= afterDelay) >= 0) {
                return duration - (time >= duration ? duration : time);
            }
            return duration;
        }
    }
    else {
        return time >= duration ? duration : time;
    }
}
exports.clock = clock;
/**
 * Return offset between 0 and 1 from current time based on duration and other parameters
 *
 * @category Utilities
 * @export
 * @param {number} time
 * @param {number} duration
 * @param {(number | boolean)} [loop=true]
 * @param {('normal' | 'reverse' | 'alternate')} [direction='alternate']
 * @param {number} [delay=0]
 * @param {number} [afterDelay=0]
 * @return {*}  {number}
 */
function clockOffset(time, duration, loop = true, direction = 'alternate', delay = 0, afterDelay = 0) {
    return clock(time, duration, loop, direction, delay, afterDelay) / duration;
}
exports.clockOffset = clockOffset;
const PI2 = Math.PI * 2;
/**
 * Return sin of period 'durate' in time 'time'
 *
 * @category Utilities
 * @export
 * @param {number} time
 * @param {number} durate
 * @param {number} phase
 * @param {boolean} [normalize=false]
 * @return {*}  {number}
 */
function sinp(time, durate, phase = 0, normalize = false) {
    const value = Math.sin((time * PI2) / durate + phase);
    return normalize ? 0.5 + value * 0.5 : value;
}
exports.sinp = sinp;
/**
 * Return cos of period 'durate' in time 'time'
 *
 * @category Utilities
 * @export
 * @param {number} time
 * @param {number} durate
 * @param {number} phase
 * @param {boolean} [normalize=false]
 * @return {*}  {number}
 */
function cosp(time, durate, phase = 0, normalize = false) {
    const value = Math.cos((time * PI2) / durate + phase);
    return normalize ? 0.5 + value * 0.5 : value;
}
exports.cosp = cosp;
/**
 *
 * @category Utilities
 * @export
 * @param {IConvertedColor} start
 * @param {IConvertedColor} end
 * @param {number} offset
 * @return {*}  {string}
 */
function interpolateColorRGB(start, end, offset) {
    const r = start.r + offset * (end.r - start.r);
    const g = start.g + offset * (end.g - start.g);
    const b = start.b + offset * (end.b - start.b);
    const alpha = start.alpha + offset * (end.alpha - start.alpha);
    return `rgba(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)},${alpha})`;
}
exports.interpolateColorRGB = interpolateColorRGB;
/**
 *
 * @category Utilities
 * @export
 * @param {IConvertedColor} start
 * @param {IConvertedColor} end
 * @param {number} offset
 * @return {*}  {string}
 */
function interpolateColorHSL(start, end, offset) {
    const h = start.h + offset * (end.h - start.h);
    const s = start.s + offset * (end.s - start.s);
    const l = start.l + offset * (end.l - start.l);
    const alpha = start.alpha + offset * (end.alpha - start.alpha);
    return `hsla(${h},${s}%,${l}%,${alpha})`;
}
exports.interpolateColorHSL = interpolateColorHSL;
//# sourceMappingURL=utilities.js.map

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAnimation = void 0;
const createInterpolator_1 = __webpack_require__(4);
/**
 * Create TAnimation from object
 *
 * @category Animation
 * @param simpleAnimation
 * @returns
 */
function createAnimation(simpleAnimation) {
    const interpolate = createInterpolator_1.createInterpolationCallback(simpleAnimation);
    if (typeof interpolate === 'undefined')
        return undefined;
    const delay = simpleAnimation.delay || 0;
    const afterDelay = simpleAnimation.afterDelay || 0;
    const direction = simpleAnimation.direction || 'normal';
    const duration = simpleAnimation.duration || 1000;
    const totalDuration = direction === 'normal'
        ? duration + delay
        : direction === 'reverse'
            ? duration + delay
            : duration * 2 + delay + afterDelay;
    const loop = typeof simpleAnimation.loop === 'number' ? simpleAnimation.loop : !!simpleAnimation.loop;
    const bindedValues = {
        delay,
        afterDelay,
        direction,
        duration,
        totalDuration,
        loop,
    };
    const animationFunction = createInterpolator_1.createInterpolator(simpleAnimation.interpolator);
    const animation = {
        loop: 0,
        offset: 0,
        loopDuration: totalDuration,
        direction: direction === 'alternate' ? 'normal' : direction,
        started: false,
        ended: false,
        value: undefined,
    };
    animation.update = createUpdate(animation, bindedValues, animationFunction, interpolate);
    return animation;
}
exports.createAnimation = createAnimation;
/**
 *
 * @internal
 * @param animation
 * @param bindedValues
 * @param animationFunction
 * @param interpolate
 * @returns
 */
function createUpdate(animation, bindedValues, animationFunction, interpolate) {
    const { loop, totalDuration, delay, afterDelay, direction, duration } = bindedValues;
    return (time) => {
        // Check animation is ended
        if ((typeof loop === 'number' && time >= totalDuration * loop) ||
            (loop === false && time >= bindedValues.totalDuration)) {
            animation.started = false;
            animation.ended = true;
            animation.offset = animationFunction(direction === 'normal' ? duration : 0, duration);
            animation.value = interpolate(animation.offset);
            return;
        }
        animation.loop = Math.ceil(time / totalDuration);
        time %= totalDuration;
        if ((time -= delay) <= 0) {
            animation.started = false;
            animation.offset = animationFunction(0, duration);
            animation.value = interpolate(animation.offset);
            return;
        }
        animation.started = true;
        if (direction === 'alternate') {
            if (time <= duration) {
                animation.direction = 'normal';
                animation.offset = animationFunction(time, duration);
            }
            else {
                animation.direction = 'reverse';
                time -= duration;
                // wait afterDelay
                if ((time -= afterDelay) >= 0) {
                    animation.offset = 1 - animationFunction(time >= duration ? duration : time, duration);
                }
                else {
                    animation.offset = 1;
                }
            }
        }
        else {
            const animationValue = animationFunction(time >= duration ? duration : time, duration);
            animation.offset = direction === 'normal' ? animationValue : 1 - animationValue;
        }
        animation.value = interpolate(animation.offset);
    };
}
//# sourceMappingURL=createAnimation.js.map

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createInterpolator = exports.createInterpolationCallback = void 0;
const color_1 = __webpack_require__(5);
const bezier_easing_1 = __webpack_require__(10);
const Easings_1 = __webpack_require__(11);
const utilities_1 = __webpack_require__(2);
/**
 * Return a callback for value interpolation passing offset from 0 to 1
 *
 * @category Interpolation
 * @param simpleAnimation
 * @returns
 */
function createInterpolationCallback(simpleAnimation) {
    const from = Array.isArray(simpleAnimation.from) ? simpleAnimation.from : [simpleAnimation.from];
    const to = Array.isArray(simpleAnimation.to) ? simpleAnimation.to : [simpleAnimation.to];
    const round = simpleAnimation.round;
    const colorInterpolation = simpleAnimation.colorTransitionMode === 'hue' ? utilities_1.interpolateColorHSL : utilities_1.interpolateColorRGB;
    if (from.length !== to.length)
        return undefined;
    const callbacks = [];
    for (let i = 0, len = from.length; i < len; i++) {
        if (typeof from[i] !== typeof to[i]) {
            console.warn('[@urpflanze/animation]: `from` and `to` values mismatch');
            return undefined;
        }
        else {
            if (typeof from[i] !== 'string') {
                const a = from[i], b = to[i];
                callbacks.push(typeof round !== 'undefined'
                    ? (offset) => offset === 1 ? b : offset === 0 ? a : Math.round((a + offset * (b - a)) * round) / round
                    : (offset) => (offset === 1 ? b : offset === 0 ? a : a + offset * (b - a)));
            }
            else {
                const a = from[i];
                const b = to[i];
                const parsed_a = color_1.parseColorAndConvert(a);
                const parsed_b = color_1.parseColorAndConvert(b);
                if (typeof parsed_a !== 'undefined' && typeof parsed_b !== 'undefined') {
                    callbacks.push((offset) => offset === 1 ? b : offset === 0 ? a : colorInterpolation(parsed_a, parsed_b, offset));
                }
            }
        }
    }
    return (offset) => {
        const values = callbacks.map(c => c(offset));
        return values.length === 1 ? values[0] : values;
    };
}
exports.createInterpolationCallback = createInterpolationCallback;
/**
 * Return a callback for calculate offset (0 to 1) from elapsed time and animation duration
 *
 * @category Interpolation
 * @param type
 * @returns
 */
function createInterpolator(type) {
    var _a, _b;
    switch (typeof type) {
        case 'function':
            return (elapsed, duration) => type(elapsed / duration, elapsed);
        case 'string':
            switch (type) {
                case 'wave':
                    return (elapsed, duration) => 0.5 + Math.sin((elapsed * Math.PI * 2) / duration + Math.PI * 1.5) * 0.5;
                default: {
                    if (type in Easings_1.Easings) {
                        const easing = Easings_1.Easings[type];
                        return (elapsed, duration) => easing(elapsed, 0, 1, duration);
                    }
                    return (elapsed, duration) => Easings_1.Easings.linear(elapsed, 0, 1, duration);
                }
            }
        case 'object':
            switch (type.type) {
                case 'wave': {
                    const phase = Math.PI * 1.5 + (((_a = type.params) === null || _a === void 0 ? void 0 : _a.phase) || 0);
                    return (elapsed, duration) => {
                        return 0.5 + Math.sin((elapsed * Math.PI * 2) / duration + phase) * 0.5;
                    };
                }
                case 'elasticIn':
                case 'elasticOut':
                case 'elasticInOut': {
                    const easing = Easings_1.Easings[type.type];
                    const { amplitude, period } = type.params || {};
                    return (elapsed, duration) => easing(elapsed, 0, 1, duration, amplitude, period);
                }
                case 'backIn':
                case 'backOut':
                case 'backInOut': {
                    const easing = Easings_1.Easings[type.type];
                    const overshoot = ((_b = type.params) === null || _b === void 0 ? void 0 : _b.overshoot) || undefined;
                    return (elapsed, duration) => easing(elapsed, 0, 1, duration, overshoot);
                }
                case 'cubicBezier': {
                    const easing = bezier_easing_1.default(type.params[0], type.params[1], type.params[2], type.params[3]);
                    return (elapsed, duration) => easing(elapsed / duration);
                }
            }
    }
    return (elapsed, duration) => Easings_1.Easings.linear(elapsed, 0, 1, duration);
}
exports.createInterpolator = createInterpolator;
//# sourceMappingURL=createInterpolator.js.map

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(7), exports);
__exportStar(__webpack_require__(8), exports);
//# sourceMappingURL=index.js.map

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rgbToHsl = exports.hslToRgb = exports.rgbToHex = void 0;
/**
 * Convert rgb to hex
 *
 * @param r number between 0 - 255
 * @param g number between 0 - 255
 * @param b number between 0 - 255
 * @returns #ffffff
 */
function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
exports.rgbToHex = rgbToHex;
/**
 * Convert hsl (0-360, 0-100, 0-100) color to rgb(0-255, 0-255, 0-255)
 *
 * @param {number} h number between 0 - 360
 * @param {number} s number between 0 - 100
 * @param {number} l number between 0 - 100
 * @returns {[number, number, number]} [0-255, 0-255, 0-255]
 */
function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        const hue2rgb = (p, q, t) => {
            t += t < 0 ? 1 : t > 1 ? -1 : 0;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [(0.5 + r * 255) << 0, (0.5 + g * 255) << 0, (0.5 + b * 255) << 0];
}
exports.hslToRgb = hslToRgb;
/**
 * Convert rbg (0-255, 0-255, 0-255) to hsl (0-360, 0-100, 0-100)
 *
 * @param {number} r number between 0 - 255
 * @param {number} g number between 0 - 255
 * @param {number} b number between 0 - 255
 * @returns {[number, number, number]} (0-360, 0-100, 0-100)
 */
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h, s;
    if (max === min) {
        h = s = 0;
    }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h = h / 6;
    }
    return [(0.5 + h * 360) << 0, (0.5 + s * 100) << 0, (0.5 + l * 100) << 0];
}
exports.rgbToHsl = rgbToHsl;
//# sourceMappingURL=conversions.js.map

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseColor = exports.parseColorAndConvert = void 0;
const htmlcolors_1 = __webpack_require__(9);
const conversions_1 = __webpack_require__(7);
/**
 * Convert color to IConvertedColor
 * Supported format: 'hsla?' 'rgba?' 'hex{3,8}' number (0xFFFFFF[FF])
 * hsla format: hsla(360, 100%, 100%, 1)
 * rgba format: rgb(255, 255, 255, 1)
 *
 * @param {(string | number)} color
 * @returns {(IConvertedColor | undefined)}
 */
function parseColorAndConvert(color) {
    const parsed = parseColor(color);
    if (parsed) {
        if (parsed.type === 'hsl') {
            const [r, g, b] = conversions_1.hslToRgb(parsed.a, parsed.b, parsed.c);
            return {
                r,
                g,
                b,
                h: parsed.a,
                s: parsed.b,
                l: parsed.c,
                alpha: parsed.alpha,
            };
        }
        else {
            const [h, s, l] = conversions_1.rgbToHsl(parsed.a, parsed.b, parsed.c);
            return {
                h,
                s,
                l,
                r: parsed.a,
                g: parsed.b,
                b: parsed.c,
                alpha: parsed.alpha,
            };
        }
    }
}
exports.parseColorAndConvert = parseColorAndConvert;
/**
 * Convert color to IColor
 * Supported format: 'hsla?' 'rgba?' 'hex{3,8}' number (0xFFFFFF[FF])
 * hsla format: hsla(360, 100%, 100%, 1)
 * rgba format: rgb(255, 255, 255, 1)
 *
 * @param {(string | number)} color
 * @returns {(IColor | undefined)}
 */
function parseColor(color) {
    if (typeof color === 'number') {
        if (color > 0xffffff) {
            return {
                type: 'rgb',
                a: (color >> 24) & 255,
                b: (color >> 16) & 255,
                c: (color >> 8) & 255,
                alpha: (color & 255) / 255,
            };
        }
        else {
            return { type: 'rgb', a: (color >> 16) & 255, b: (color >> 8) & 255, c: color & 255, alpha: 1 };
        }
    }
    color = color.replace(/\s/g, '');
    if (htmlcolors_1.default[color])
        color = htmlcolors_1.default[color];
    let match = /^#([0-9a-f]{3,8})$/i.exec(color);
    if (match) {
        const hex = match[1];
        if (hex.length === 3) {
            return {
                type: 'rgb',
                a: parseInt(hex[0] + hex[0], 16),
                b: parseInt(hex[1] + hex[1], 16),
                c: parseInt(hex[2] + hex[2], 16),
                alpha: 1,
            };
        }
        else {
            return {
                type: 'rgb',
                a: parseInt(hex[0] + hex[1], 16),
                b: parseInt(hex[2] + hex[3], 16),
                c: parseInt(hex[4] + hex[5], 16),
                alpha: hex.length > 6 ? parseInt(hex.substring(6), 16) / 255 : 1,
            };
        }
    }
    match = /^((hsl|rgb)a?)\((\d+),(\d+)%?,(\d+)%?,?(.+)?\)$/i.exec(color);
    if (match) {
        const [, , type, a, b, c, alpha] = match;
        return {
            type: type,
            a: +a,
            b: +b,
            c: +c,
            alpha: alpha ? +alpha : 1,
        };
    }
}
exports.parseColor = parseColor;
//# sourceMappingURL=parsing.js.map

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const colors = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};
exports.default = colors;
//# sourceMappingURL=htmlcolors.js.map

/***/ }),
/* 10 */
/***/ ((module) => {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function LinearEasing (x) {
  return x;
}

module.exports = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Easings = void 0;
/**
 * Easing functions
 *
 * @category Interpolation
 * @export
 */
exports.Easings = {
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    linear: (timeOrOffset, start, end, duration = 1) => (end * timeOrOffset) / duration + start,
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    quadraticIn: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration;
        return end * timeOrOffset * timeOrOffset + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    quadraticOut: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration;
        return -end * timeOrOffset * (timeOrOffset - 2) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    quadraticInOut: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration / 2;
        if (timeOrOffset < 1)
            return (end / 2) * timeOrOffset * timeOrOffset + start;
        timeOrOffset--;
        return (-end / 2) * (timeOrOffset * (timeOrOffset - 2) - 1) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    cubicIn: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration;
        return end * timeOrOffset * timeOrOffset * timeOrOffset + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    cubicOut: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration;
        timeOrOffset--;
        return end * (timeOrOffset * timeOrOffset * timeOrOffset + 1) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    cubicInOut: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration / 2;
        if (timeOrOffset < 1)
            return (end / 2) * timeOrOffset * timeOrOffset * timeOrOffset + start;
        timeOrOffset -= 2;
        return (end / 2) * (timeOrOffset * timeOrOffset * timeOrOffset + 2) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    quarticIn: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration;
        return end * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    quarticOut: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration;
        timeOrOffset--;
        return -end * (timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset - 1) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    quarticInOut: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration / 2;
        if (timeOrOffset < 1)
            return (end / 2) * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + start;
        timeOrOffset -= 2;
        return (-end / 2) * (timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset - 2) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    quinticIn: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration;
        return end * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    quinticOut: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration;
        timeOrOffset--;
        return end * (timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + 1) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    quinticInOut: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration / 2;
        if (timeOrOffset < 1)
            return (end / 2) * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + start;
        timeOrOffset -= 2;
        return (end / 2) * (timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset * timeOrOffset + 2) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    sinusoidalIn: (timeOrOffset, start, end, duration = 1) => {
        return -end * Math.cos((timeOrOffset / duration) * (Math.PI / 2)) + end + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    sinusoidalOut: (timeOrOffset, start, end, duration = 1) => {
        return end * Math.sin((timeOrOffset / duration) * (Math.PI / 2)) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    sinusoidalInOut: (timeOrOffset, start, end, duration = 1) => {
        return (-end / 2) * (Math.cos((Math.PI * timeOrOffset) / duration) - 1) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    exponentialIn: (timeOrOffset, start, end, duration = 1) => {
        return end * Math.pow(2, 10 * (timeOrOffset / duration - 1)) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    exponentialOut: (timeOrOffset, start, end, duration = 1) => {
        return end * (-Math.pow(2, (-10 * timeOrOffset) / duration) + 1) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    exponentialInOut: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration / 2;
        if (timeOrOffset < 1)
            return (end / 2) * Math.pow(2, 10 * (timeOrOffset - 1)) + start;
        timeOrOffset--;
        return (end / 2) * (-Math.pow(2, -10 * timeOrOffset) + 2) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    circularIn: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration;
        return -end * (Math.sqrt(1 - timeOrOffset * timeOrOffset) - 1) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    circularOut: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration;
        timeOrOffset--;
        return end * Math.sqrt(1 - timeOrOffset * timeOrOffset) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @returns {number}
     */
    circularInOut: (timeOrOffset, start, end, duration = 1) => {
        timeOrOffset /= duration / 2;
        if (timeOrOffset < 1)
            return (-end / 2) * (Math.sqrt(1 - timeOrOffset * timeOrOffset) - 1) + start;
        timeOrOffset -= 2;
        return (end / 2) * (Math.sqrt(1 - timeOrOffset * timeOrOffset) + 1) + start;
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
    elasticIn: (timeOrOffset, start, end, duration = 1, amplitude = 1, period = 0.5) => {
        if (timeOrOffset === 0) {
            return start;
        }
        if ((timeOrOffset /= duration) === 1) {
            return start + end;
        }
        period *= duration;
        let s = 0;
        if (amplitude < Math.abs(end)) {
            amplitude = end;
            s = period / 4;
        }
        else {
            s = (period / (2 * Math.PI)) * Math.asin(end / amplitude);
        }
        return (-(amplitude *
            Math.pow(2, 10 * (timeOrOffset -= 1)) *
            Math.sin(((timeOrOffset * duration - s) * (2 * Math.PI)) / period)) + start);
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
    elasticOut: (timeOrOffset, start, end, duration = 1, amplitude = 1, period = 0.5) => {
        if (timeOrOffset === 0) {
            return start;
        }
        if ((timeOrOffset /= duration) === 1) {
            return start + end;
        }
        period *= duration;
        let s = 0;
        if (amplitude < Math.abs(end)) {
            amplitude = end;
            s = period / 4;
        }
        else {
            s = (period / (2 * Math.PI)) * Math.asin(end / amplitude);
        }
        return (amplitude * Math.pow(2, -10 * timeOrOffset) * Math.sin(((timeOrOffset * duration - s) * (2 * Math.PI)) / period) +
            end +
            start);
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
    elasticInOut: (timeOrOffset, start, end, duration = 1, amplitude = 1, period = 0.5) => {
        if (timeOrOffset === 0) {
            return start;
        }
        if ((timeOrOffset /= duration / 2) === 2) {
            return start + end;
        }
        period *= duration;
        let s = 0;
        if (amplitude < Math.abs(end)) {
            amplitude = end;
            s = period / 4;
        }
        else {
            s = (period / (2 * Math.PI)) * Math.asin(end / amplitude);
        }
        if (timeOrOffset < 1) {
            return (-0.5 *
                (amplitude *
                    Math.pow(2, 10 * (timeOrOffset -= 1)) *
                    Math.sin(((timeOrOffset * duration - s) * (2 * Math.PI)) / period)) +
                start);
        }
        return (amplitude *
            Math.pow(2, -10 * (timeOrOffset -= 1)) *
            Math.sin(((timeOrOffset * duration - s) * (2 * Math.PI)) / period) *
            0.5 +
            end +
            start);
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @param {number} overshoot (optional)
     * @return {number}
     */
    backIn: (timeOrOffset, start, end, duration = 1, overshoot = 1.70158) => {
        return end * (timeOrOffset /= duration) * timeOrOffset * ((overshoot + 1) * timeOrOffset - overshoot) + start;
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @param {number} s overshoot (optional)
     * @return {number}
     */
    backOut: (timeOrOffset, start, end, duration = 1, overshoot = 1.70158) => {
        return (end *
            ((timeOrOffset = timeOrOffset / duration - 1) * timeOrOffset * ((overshoot + 1) * timeOrOffset + overshoot) +
                1) +
            start);
    },
    /**
     * @param {number} timeOrOffset current time
     * @param {number} start start value
     * @param {number} end end value
     * @param {number} duration duration
     * @param {number} overshoot (optional)
     * @return {number}
     */
    backInOut: (timeOrOffset, start, end, duration = 1, overshoot = 1.70158) => {
        if ((timeOrOffset /= duration / 2) < 1) {
            return (end / 2) * (timeOrOffset * timeOrOffset * (((overshoot *= 1.525) + 1) * timeOrOffset - overshoot)) + start;
        }
        return ((end / 2) * ((timeOrOffset -= 2) * timeOrOffset * (((overshoot *= 1.525) + 1) * timeOrOffset + overshoot) + 2) +
            start);
    },
    /**
     * @param {number} t current time
     * @param {number} b start value
     * @param {number} c end value
     * @param {number} d duration
     * @return {number}
     */
    bounceIn: (timeOrOffset, start, end, duration = 1) => {
        return end - exports.Easings.bounceOut(duration - timeOrOffset, 0, end, duration) + start;
    },
    /**
     * @param {number} t current time
     * @param {number} b start value
     * @param {number} c end value
     * @param {number} d duration
     * @return {number}
     */
    bounceOut: (timeOrOffset, start, end, duration = 1) => {
        if ((timeOrOffset /= duration) < 1 / 2.75) {
            return end * (7.5625 * timeOrOffset * timeOrOffset) + start;
        }
        else if (timeOrOffset < 2 / 2.75) {
            return end * (7.5625 * (timeOrOffset -= 1.5 / 2.75) * timeOrOffset + 0.75) + start;
        }
        else if (timeOrOffset < 2.5 / 2.75) {
            return end * (7.5625 * (timeOrOffset -= 2.25 / 2.75) * timeOrOffset + 0.9375) + start;
        }
        return end * (7.5625 * (timeOrOffset -= 2.625 / 2.75) * timeOrOffset + 0.984375) + start;
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
    bounceInOut: (timeOrOffset, start, end, duration = 1) => {
        if (timeOrOffset < duration / 2) {
            return exports.Easings.bounceIn(timeOrOffset * 2, 0, end, duration) * 0.5 + start;
        }
        return exports.Easings.bounceOut(timeOrOffset * 2 - duration, 0, end, duration) * 0.5 + end * 0.5 + start;
    },
};
//# sourceMappingURL=Easings.js.map

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UncontrolledLoop = exports.Static = exports.Loop = exports.Compose = exports.Simple = exports.resolveSimpleAnimation = void 0;
const composeAnimations_1 = __webpack_require__(13);
const createAnimation_1 = __webpack_require__(3);
/**
 * Create animation from ISimpleAnimation.
 *
 * @category Animation
 * @export
 * @param {ISimpleAnimation} simpleAnimation
 * @return {*}  {(TAnimationCallback | undefined)}
 */
function resolveSimpleAnimation(simpleAnimation) {
    const animation = createAnimation_1.createAnimation(simpleAnimation);
    if (animation) {
        return (propArgumentsOrCurrentTime) => {
            var _a;
            const currentTime = typeof propArgumentsOrCurrentTime === 'number'
                ? propArgumentsOrCurrentTime
                : ((_a = propArgumentsOrCurrentTime.shape.scene) === null || _a === void 0 ? void 0 : _a.currentTime) || 0;
            animation.update(currentTime);
            return animation.value;
        };
    }
}
exports.resolveSimpleAnimation = resolveSimpleAnimation;
/**
 * resolveSimpleAnimations alias
 * @export
 * @category Animation
 */
exports.Simple = resolveSimpleAnimation;
/**
 * Compose multiple animation into one.
 *
 * @category Animation
 * @export
 * @param {Array<ISimpleAnimation>} animations
 * @return {*}  {(TAnimationCallback | undefined)}
 */
function Compose(animations) {
    const composed = composeAnimations_1.composeAnimations(animations);
    if (composed) {
        return (propArgumentsOrCurrentTime) => {
            var _a;
            const currentTime = typeof propArgumentsOrCurrentTime === 'number'
                ? propArgumentsOrCurrentTime
                : ((_a = propArgumentsOrCurrentTime.shape.scene) === null || _a === void 0 ? void 0 : _a.currentTime) || 0;
            return composed(currentTime);
        };
    }
}
exports.Compose = Compose;
/**
 * Create Loop animation.
 *
 * @category Animation
 * @export
 * @param {(Omit<ISimpleAnimation, 'direction' | 'loop'>)} loopAnimation
 * @return {*}  {(TAnimationCallback | undefined)}
 */
function Loop(loopAnimation) {
    const simpleAnimation = loopAnimation;
    if (typeof simpleAnimation.interpolator === 'undefined') {
        simpleAnimation.interpolator = 'wave';
    }
    if (simpleAnimation.interpolator) {
        if (typeof simpleAnimation.interpolator === 'string') {
            if (simpleAnimation.interpolator !== 'wave') {
                simpleAnimation.direction = 'alternate';
            }
        }
        else if (typeof simpleAnimation.interpolator === 'object' && simpleAnimation.interpolator.type !== 'wave') {
            simpleAnimation.direction = 'alternate';
        }
    }
    simpleAnimation.loop = true;
    return resolveSimpleAnimation(simpleAnimation);
}
exports.Loop = Loop;
/**
 * Create an animation that repeats once
 *
 * @category Animation
 * @export
 * @param {(Omit<ISimpleAnimation, 'direction' | 'loop'>)} staticAnimation
 * @return {*}  {(TAnimationCallback | undefined)}
 */
function Static(staticAnimation) {
    const simpleAnimation = staticAnimation;
    simpleAnimation.direction = 'normal';
    simpleAnimation.loop = false;
    return resolveSimpleAnimation(simpleAnimation);
}
exports.Static = Static;
/**
 * Create an animation that repeats in a single direction
 *
 * @category Animation
 * @export
 * @param {(Omit<ISimpleAnimation, 'direction' | 'loop'>)} uncontrolledLoopAnimation
 * @return {*}
 */
function UncontrolledLoop(uncontrolledLoopAnimation) {
    const simpleAnimation = uncontrolledLoopAnimation;
    simpleAnimation.direction = 'normal';
    simpleAnimation.loop = true;
    return resolveSimpleAnimation(simpleAnimation);
}
exports.UncontrolledLoop = UncontrolledLoop;
//# sourceMappingURL=Animation.js.map

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.composeAnimations = void 0;
const color_1 = __webpack_require__(5);
const createAnimation_1 = __webpack_require__(3);
const utilities_1 = __webpack_require__(2);
/**
 *
 * @category Utilities
 * @export
 * @param {Array<ISimpleAnimation>} simpleAnimations
 * @return {*}  {(((currentTime: number) => string | number | Array<string | number> | undefined) | undefined)}
 */
function composeAnimations(simpleAnimations) {
    const animations = simpleAnimations.map(createAnimation_1.createAnimation).filter(a => typeof a !== 'undefined');
    const animationsLength = animations.length;
    if (animationsLength > 0) {
        return (currentTime) => {
            let value = undefined;
            for (let i = 0; i < animationsLength; i++) {
                const animation = animations[i];
                animation.update(currentTime);
                value = typeof value === 'undefined' ? animation.value : interpolate(value, animation.value);
            }
            return value;
        };
    }
}
exports.composeAnimations = composeAnimations;
function interpolate(a, b, offset = 0.5) {
    const from = Array.isArray(a) ? a : [a];
    const to = Array.isArray(b) ? b : [b];
    const results = [];
    for (let i = 0, len = from.length; i < len; i++) {
        if (typeof from[i] !== typeof to[i]) {
            console.error('[@urpflanze/animation]: cannot interpolate');
            return undefined;
        }
        else {
            if (typeof from[i] !== 'string') {
                const a = from[i], b = to[i];
                results.push(a + offset * (b - a));
            }
            else {
                const a = from[i];
                const b = to[i];
                const parsed_a = color_1.parseColorAndConvert(a);
                const parsed_b = color_1.parseColorAndConvert(b);
                if (typeof parsed_a !== 'undefined' && typeof parsed_b !== 'undefined') {
                    results.push(utilities_1.interpolateColorRGB(parsed_a, parsed_b, offset));
                }
            }
        }
    }
    return results.length === 1 ? results[0] : results;
}
//# sourceMappingURL=composeAnimations.js.map

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=urpflanze-animation.js.map