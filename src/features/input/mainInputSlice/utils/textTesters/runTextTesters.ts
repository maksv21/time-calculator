import type { TextTester } from './testers'
import { limitMaxNumber } from './testers'

export enum ERROR_TAGS {
  critical = '$',
  nonCritical = '#',
}

interface TextTestersRunner {
  (props: { prevValue: string; newValue: string; isTestModeStrict: boolean }):
    | {
        isCorrect: true
      }
    | {
        isCorrect: false
        error: string
        valueToRender?: string
      }
}

const ALL_TESTERS: TextTester[] = [limitMaxNumber]

const runTextTesters: TextTestersRunner = ({
  prevValue,
  newValue,
  isTestModeStrict,
}) => {
  const foundError: TextTester | undefined = ALL_TESTERS.find(
    ({ regExp }: TextTester) => newValue.match(regExp)
  )

  if (!foundError) {
    return { isCorrect: true }
  }

  const errorsInPrevValue = prevValue.match(foundError.regExp)
  const errorInNewValue = newValue.match(foundError.regExp)

  if (
    foundError.isCritical &&
    isTestModeStrict &&
    (!errorsInPrevValue ||
      !errorInNewValue ||
      errorInNewValue.length <= errorsInPrevValue.length)
  ) {
    return { isCorrect: false, error: foundError.errorText }
  }

  const errorTag = foundError.isCritical
    ? ERROR_TAGS.critical
    : ERROR_TAGS.nonCritical
  const valueToRender = newValue.replaceAll(
    foundError.regExp,
    (matchedValue) => errorTag + matchedValue + errorTag
  )

  return { isCorrect: false, error: foundError.errorText, valueToRender }
}

export default runTextTesters
