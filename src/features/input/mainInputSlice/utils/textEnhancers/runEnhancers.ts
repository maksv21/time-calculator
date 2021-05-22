export type TextEnhancer = (textToEnhance: string) => string

const runEnhancers = (
  textToEnhance: string,
  enhancers: TextEnhancer[]
): string =>
  enhancers.reduce(
    (enhancedText, enhancerFunc) => enhancerFunc(enhancedText),
    textToEnhance
  )

export default runEnhancers
