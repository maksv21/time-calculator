export interface TextTester {
  regExp: RegExp
  errorText: string
  isCritical: boolean // will affect on rendering
}
export const limitMaxNumber: TextTester = {
  regExp: /\d{11,}/g,
  errorText: 'Number is too big',
  isCritical: false,
}
