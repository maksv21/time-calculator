export default timeExpression => {
  const expression = timeExpression
    .replace(/[^0-9:.÷×+-]/g, '') // leave only numbers and operators
    .replace(/[÷×+-.:]/g, value => value.charAt(0)) // +++++ -> +
    .replace(/[÷×]/g, value => value === '×' ? '*' : '/') // ÷× -> /*
    .replace(/\d+:\d*/g, value => { // time -> numbers
      const timeValue = value.split(':');
      timeValue[1] = String(
        Math.trunc(timeValue[1] / 60 * 100)
      );

      return timeValue.join('.');
    });

  let result;
  try {
    result = numberToTime(new Function('return ' + expression)());
  } catch {
    result = 'Incorrect expression';
  }

  return result;
}

function numberToTime(number) {
  let [hours, minutes] = number.toString().split('.'); // 0 - hours, 1 - minutes

  minutes = minutes ? (minutes + '0').slice(0, 2) : '00'; // 00.5 -> 00.50
  minutes = (Math.trunc(minutes / 100 * 60)).toString(); // 100 -> 60
  minutes = ('0' + minutes).slice(-2) // 1 -> 01

  return hours + ':' + minutes;
}
