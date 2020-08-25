import randomName from './magicTavern'

it('returns a string', () => {
    expect(randomName()).toMatch(/.*?/)
})