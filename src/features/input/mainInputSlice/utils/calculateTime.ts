const timeToExpression = (timeExpression: string): string =>
  timeExpression
    .replace(/÷/g, '/')
    .replace(/×/g, '*')
    .replace(/(^[^\d]+)|([^\d]+$)/g, '')

    .replace(/^0+\d/g, (value) => value.slice(-1)) // 00123+123 -> 123+123, at the start
    .replace(/[^\d]0+\d/g, (value) => value.replace('0', '')) // 123+00123 -> 123+123, at the middle of the expression

    .replace(/\d+:\d*/g, (value) => {
      // 10:30 -> 10.5
      const timeValue = value.split(':').map((item) => +item)
      timeValue[1] /= 60

      return (timeValue[0] + timeValue[1]).toString()
    })

const numberToTime = (number: number): string => {
  const splitNumber = number.toString().split('.') // 0 - hours, 1 - minutes

  const hours = splitNumber[0]
  let minutes = splitNumber[1]
  if (minutes) {
    minutes = `0.${minutes}`
    minutes = Math.round(+minutes * 60).toString() // 100 -> 60
    minutes = `0${minutes}`.slice(-2) // 1 -> 01
  } else {
    minutes = '00' // 1 -> 01
  }

  return `${hours}:${minutes}`
}

interface TimeCalculator {
  (timeExpression: string):
    | {
        isCorrect: true
        value: string
      }
    | {
        isCorrect: false
        error: string
      }
}

const calculateTime: TimeCalculator = (timeExpression: string) => {
  const expression = timeToExpression(timeExpression)

  try {
    // eslint-disable-next-line  no-new-func
    const calculatedValue = new Function(`return ${expression}`)()

    if (calculatedValue > Number.MAX_SAFE_INTEGER) {
      return { isCorrect: false, error: 'Error: Number is too big' }
    }

    return { isCorrect: true, value: numberToTime(calculatedValue) }
  } catch {
    return { isCorrect: false, error: 'Error: Bad expression' }
  }
}

export default calculateTime
