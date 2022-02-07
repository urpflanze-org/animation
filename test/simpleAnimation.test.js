const Animation = require('../dist/cjs')

test('simple animation', () => {
	const anim = Animation.Simple({
		from: 0,
		to: 100,
		duration: 1000,
		loop: 2,
	})

	expect(anim(-10)).toBe(0)
	expect(anim(0)).toBe(0)
	expect(anim(500)).toBe(50)
	expect(anim(2200)).toBe(100)

	const anim2 = Animation.Simple({
		from: 0,
		to: 100,
		duration: 300,
		delay: 400,
	})

	expect(anim2(100)).toBe(0)
	expect(anim2(550)).toBe(50)
	expect(anim2(701)).toBe(100)

	const anim3 = Animation.Loop({
		from: 100,
		to: 200,
		duration: 300,
		delay: 400,
		afterDelay: 200,
		direction: 'alternate',
		interpolator: 'linear',
	})

	expect(anim3(100)).toBe(100) // not started
	expect(anim3(550)).toBe(150) // started 400 + 150
	expect(anim3(700)).toBe(200) // end
	expect(anim3(800)).toBe(200) /// after delay 100
	expect(anim3(1050)).toBe(150) // reverse anim
	expect(anim3(400 + 300 + 200 + 300 + 400 + 150)).toBe(150) // loop 2 delay + dur + afterD + dur (reverse) + delay + dur/2
})
