const errorIncorrectExp = { error: 'Error: Bad expression' }
const errorTooBig = { error: 'Error: Number is too big' }

function isCorrectExp(exp) {
  const newExp = exp
    .replace(/[^0-9:.÷×+-]/g, '') // leave only numbers and operators
    .replace(/[-+÷×.:]{2,}/g, (value) => value[value.length - 1]) // ----++++ -> +

  return newExp === exp
}

function numberToTime(number) {
  const splittedNumber = number.toString().split('.') // 0 - hours, 1 - minutes

  const hours = splittedNumber
  let minutes = splittedNumber

  minutes = `0.${minutes}`
  minutes = Math.round(minutes * 60) // 100 -> 60
  minutes = minutes ? `0${minutes}`.slice(-2) : '00' // 1 -> 01

  return `${hours}:${minutes}`
}

// todo: check each number whether it is safe
export default (timeExpression) => {
  if (!isCorrectExp(timeExpression)) {
    return errorIncorrectExp
  }

  const expression = timeExpression
    .replace(/[÷×]/g, (value) => (value === '×' ? '*' : '/')) // ÷× -> /*
    .replace(/^0+[1-9]/g, (value) => value.slice(-1)) // 00123 -> 123 in start
    .replace(/[^\d]0[1-9]/g, (value) => value.replace('0', '')) // 123+00123 -> 123+123, in the middle of the expression

    .replace(/\d+:\d*/g, (value) => {
      // time -> numbers
      const timeValue = value.split(':')
      timeValue[1] = String(timeValue[1] / 60)

      return (+timeValue[0] + +timeValue[1]).toString()
    })

  try {
    // eslint-disable-next-line  no-new-func
    const calculatedValue = new Function(`return ${expression}`)()

    if (calculatedValue === Infinity) {
      return errorIncorrectExp
    }
    if (calculatedValue > Number.MAX_SAFE_INTEGER) {
      return errorTooBig
    }

    return numberToTime(calculatedValue)
  } catch {
    return errorIncorrectExp
  }
}
