import type { TextTester } from './runTextEnhancers'

const limitMaxNumber: TextTester = (textToTest: string) =>
  !/\d{9}/.test(textToTest)

export default limitMaxNumber
