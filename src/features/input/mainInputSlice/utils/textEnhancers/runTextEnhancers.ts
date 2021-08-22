export type TextTester = (textToTest: string) => boolean
export type TextEnhancer = (textToEnhance: string) => string

// interface Props {
//   prevValue: string
//   textToEnhance: string
// }

// // todo: CHAR-38
// // const runTextEnhancers = ({ prevValue, textToEnhance }: Props): string => {
// //   return 'null'

// //   // return enhancers.reduce(
// //   //   (enhancedText, enhancerFunc) => enhancerFunc(enhancedText),
// //   //   textToEnhance
// //   // )
// // }

// // export default runTextEnhancers
