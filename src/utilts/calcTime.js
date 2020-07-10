const errorMessage = {error: 'Error: Bad expression'};

export default timeExpression => {
  if(!isCorrectExp(timeExpression)) {
    return errorMessage;
  }

  const expression = timeExpression
    .replace(/[÷×]/g, value => value === '×' ? '*' : '/') // ÷× -> /*
    .replace(/^0+[1-9]/g, value => value.slice(-1)) // 00123 -> 123 in start
    .replace(/[^\d]0[1-9]/g, value => value.replace('0', '')) // 123+00123 -> 123+123, in the middle of the expression

    .replace(/\d+:\d*/g, value => { // time -> numbers
      const timeValue = value.split(':');
      timeValue[1] = String(timeValue[1] / 60);

      return (+timeValue[0] + +timeValue[1]).toString();
    });

  try {
    // eslint-disable-next-line  no-new-func
    const calculatedValue = new Function('return ' + expression)();

    return calculatedValue === Infinity ? errorMessage : numberToTime(calculatedValue);
  } catch {
    return errorMessage;
  }
}

function isCorrectExp(exp) {
  const newExp = exp.replace(/[^0-9:.÷×+-]/g, '') // leave only numbers and operators
    .replace(/[-+÷×.:]{2,}/g, value => value[value.length - 1]) // ----++++ -> +

  return newExp === exp;
}

function numberToTime(number) {
  let [hours, minutes] = number.toString().split('.'); // 0 - hours, 1 - minutes

  minutes = '0.' + minutes;
  minutes = Math.round(minutes * 60); // 100 -> 60
  minutes = minutes ? ('0' + minutes).slice(-2) : '00'  // 1 -> 01

  return hours + ':' + minutes;
}
