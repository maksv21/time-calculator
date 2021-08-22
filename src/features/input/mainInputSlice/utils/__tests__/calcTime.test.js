import calculateTime from '../calculateTime'

describe('calculateTime main functionality', () => {
  it('If expression correct, should return time', () => {
    expect(calculateTime('10:25+5:35').value).toBe('16:00')
    expect(calculateTime('10:00+1:25').value).toBe('11:25')
    expect(calculateTime('0:5+0:5').value).toBe('0:10')
  })

  it('If exp is correct time and there no operators, should return this exp', () => {
    expect(calculateTime('10:25').value).toBe('10:25')
    expect(calculateTime('10:00').value).toBe('10:00')
    expect(calculateTime('0:05').value).toBe('0:05')
  })

  it(`If exp isn't correct time and there no operators, should transform this exp to corr time`, () => {
    expect(calculateTime('0:250').value).toBe('4:10')
    expect(calculateTime('10:1').value).toBe('10:01')
    expect(calculateTime('0:5').value).toBe('0:05')
    expect(calculateTime('4:').value).toBe('4:00')
  })

  it(`If exp is contains zeros at start, exp shouldn't be considered as bitwise and zeros should be deleted`, () => {
    expect(calculateTime('010').value).toBe('10:00')
    expect(calculateTime('00100:').value).toBe('100:00')
    expect(calculateTime('0:30+0:030').value).toBe('1:00')
  })

  it('If exp contains forbidden symbols, should return error', () => {
    expect(calculateTime('test').error).toBe('Error: Bad expression')
  })

  it('If exp is too big, should return error', () => {
    expect(calculateTime('9999**99').error).toBe('Error: Number is too big')
  })
})
