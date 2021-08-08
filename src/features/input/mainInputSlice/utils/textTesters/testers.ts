export interface TextTester {
  regExp: RegExp
  // regExp is for testing, match is for rendering issue. optional if regExp can be used for the match
  match?: RegExp
  errorText: string
  isCritical: boolean // will affect on rendering
}

export const limitMaxNumber: TextTester = {
  regExp: /\d{11,}/g,
  errorText: 'Number is too big',
  isCritical: true,
}

export const noTwoOperators: TextTester = {
  regExp: /[÷×\-+:.]{2,}/g,
  errorText: 'Two operators in a row',
  isCritical: true,
}

export const noDivideByZero: TextTester = {
  regExp: /(÷0+[^0-9]+)|(÷0+$)/g,
  match: /÷0+/,
  errorText: "Can't divide by zero",
  isCritical: false,
}
