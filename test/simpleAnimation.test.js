const tap = require('tap')
const Animation = require('../dist/cjs')

const anim = Animation.Simple({
	from: 0,
	to: 100,
	duration: 1000,
	loop: 2,
})

tap.equal(anim(-10), 0)
tap.equal(anim(0), 0)
tap.equal(anim(500), 50)
tap.equal(anim(2200), 100)

const anim2 = Animation.Simple({
	from: 0,
	to: 100,
	duration: 300,
	delay: 400,
})

tap.equal(anim2(100), 0)
tap.equal(anim2(550), 50)
tap.equal(anim2(701), 100)

const anim3 = Animation.Loop({
	from: 100,
	to: 200,
	duration: 300,
	delay: 400,
	afterDelay: 200,
	direction: 'alternate',
	interpolator: 'linear',
})

tap.equal(anim3(100), 100) // not started
tap.equal(anim3(550), 150) // started 400 + 150
tap.equal(anim3(700), 200) // end
tap.equal(anim3(800), 200) /// after delay 100
tap.equal(anim3(1050), 150) // reverse anim
tap.equal(anim3(400 + 300 + 200 + 300 + 400 + 150), 150) // loop 2 delay + dur + afterD + dur (reverse) + delay + dur/2
