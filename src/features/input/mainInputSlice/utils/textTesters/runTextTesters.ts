import { testersArr } from './testers'

const ERROR_TAGS = {
  critical: '$',
  nonCritical: '#',
}

export enum TypesOfRenderValue {
  value,
  error,
  warning,
}

export type ValueWithErrors = { value: string; type: TypesOfRenderValue }[]

interface TextTestersRunner {
  (props: { prevValue: string; newValue: string; isTestModeStrict: boolean }):
    | {
        isCorrect: true
      }
    | {
        isCorrect: false
        error?: string
        valueToRender?: ValueWithErrors
      }
}

const matchError = (
  value: string,
  regExp: RegExp,
  errorTag: string
): string => {
  const matchedObj = value.match(regExp)

  if (!matchedObj) return ''

  const matchedIndex = matchedObj.index || 0
  const matchedValue = matchedObj[0]

  return (
    value.slice(0, matchedIndex) +
    errorTag +
    matchedValue +
    errorTag +
    value.slice(matchedIndex + matchedValue.length)
  )
}

const findErrors = (stringToTest: string) =>
  testersArr.reduce(
    (
      resultObj: {
        valueWithErrors: string
        criticalErrorsCount: number
        firstFoundError: null | string
      },
      tester
    ) => {
      const errorTag = tester.isCritical
        ? ERROR_TAGS.critical
        : ERROR_TAGS.nonCritical

      resultObj.valueWithErrors = resultObj.valueWithErrors.replace(
        tester.regExp,
        (matchedValue) => {
          if (tester.isCritical) resultObj.criticalErrorsCount += 1
          resultObj.firstFoundError =
            resultObj.firstFoundError || tester.errorText

          return tester.match
            ? matchError(matchedValue, tester.match, errorTag)
            : errorTag + matchedValue + errorTag
        }
      )

      return resultObj
    },
    {
      valueWithErrors: stringToTest,
      criticalErrorsCount: 0,
      firstFoundError: null,
    }
  )

const runTextTesters: TextTestersRunner = ({
  prevValue,
  newValue,
  isTestModeStrict,
}) => {
  const { valueWithErrors, criticalErrorsCount, firstFoundError } =
    findErrors(newValue)

  if (!firstFoundError) {
    return { isCorrect: true }
  }

  const { criticalErrorsCount: criticalErrorsInPrevValue } =
    findErrors(prevValue)

  if (isTestModeStrict && criticalErrorsCount > criticalErrorsInPrevValue) {
    return { isCorrect: false }
  }

  const valueToRender: ValueWithErrors =
    valueWithErrors.match(/(\$[^$]+\$)|(#[^#]+#)|[^#$]+/g)?.map((matched) => {
      if (
        matched[0] === ERROR_TAGS.critical ||
        matched[0] === ERROR_TAGS.nonCritical
      ) {
        return {
          value: matched.replace(
            new RegExp(
              `[${ERROR_TAGS.critical + ERROR_TAGS.nonCritical}]`,
              'g'
            ),
            ''
          ),
          type:
            matched[0] === ERROR_TAGS.critical
              ? TypesOfRenderValue.error
              : TypesOfRenderValue.warning,
        }
      }

      return {
        value: matched,
        type: TypesOfRenderValue.value,
      }
    }) || []

  return { isCorrect: false, error: firstFoundError, valueToRender }
}

export default runTextTesters
