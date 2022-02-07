const Animation = require('../dist/cjs')

test('compose', () => {
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

	expect(anim(0)).toBe(0)
	expect(anim(500)).toBe(50)
	expect(anim(1000)).toBe(100)

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

	expect(anim2(0)).toBe(50)
	expect(anim2(1000)).toBe(125) // anim: 100, anim2: 150
	expect(anim2(2000)).toBe(100)
})
