import calcTime from '../calcTime';

describe('calcTime main functionality', () => {
  it('If expression correct, should return time', () => {
    expect(calcTime('10:25+5:35')).toBe('16:00');
    expect(calcTime('10:00+1:25')).toBe('11:25');
    expect(calcTime('0:5+0:5')).toBe('0:10');
  });

  it('If exp is correct time and there no operators, should return this exp', () => {
    expect(calcTime('10:25')).toBe('10:25');
    expect(calcTime('10:00')).toBe('10:00');
    expect(calcTime('0:05')).toBe('0:05');
  });

  it(`If exp isn't correct time and there no operators, should transform this exp to corr time`, () => {
    expect(calcTime('0:250')).toBe('4:10');
    expect(calcTime('10:1')).toBe('10:01');
    expect(calcTime('0:5')).toBe('0:05');
    expect(calcTime('4:')).toBe('4:00');
  });

  it(`If exp is contains zeros at start, exp shouldn't be considered as bitwise and zeros should be deleted`, () => {
    expect(calcTime('010')).toBe('10:00');
    expect(calcTime('00100:')).toBe('100:00');
    expect(calcTime('0:30+0:030')).toBe('1:00');
  });

  it('If exp contains forbidden symbols, should return error', () => {
    expect(calcTime('test').error).toBe('Error: Bad expression');
  });

  it('If exp incorrect, should return error', () => {
    expect(calcTime('25+').error).toBe('Error: Bad expression');
    expect(calcTime('45:1:3').error).toBe('Error: Bad expression');
    expect(calcTime('45.1:3').error).toBe('Error: Bad expression');
  });
})
