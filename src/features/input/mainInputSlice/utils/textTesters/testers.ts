export interface TextTester {
  regExp: RegExp
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
