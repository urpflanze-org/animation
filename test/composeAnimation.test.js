const tap = require('tap')
const Animation = require('../dist/cjs')

const anim = Animation.Compose([
	{
		from: 0,
		to: 100,
		duration: 1000,
	},
	{
		from: 0,
		to: 100,
		duration: 1000,
	},
])

tap.equal(anim(0), 0)
tap.equal(anim(500), 50)
tap.equal(anim(1000), 100)

const anim2 = Animation.Compose([
	{
		from: 0,
		to: 100,
		duration: 1000,
	},
	{
		from: 100,
		to: 200,
		duration: 1000,
		delay: 500,
		loop: true,
	},
])

tap.equal(anim2(0), 50)
tap.equal(anim2(1000), 125) // anim: 100, anim2: 150
tap.equal(anim2(2000), 100)
