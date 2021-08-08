export interface TextTester {
  regExp: RegExp
  // regExp is for testing, match is for rendering issue. optional if regExp can be used for the match
  match?: RegExp
  errorText: string
  isCritical: boolean // will affect on rendering
}

export const testersArr: TextTester[] = [
  {
    regExp: /\d{11,}/g,
    errorText: 'Number is too big',
    isCritical: true,
  },

  {
    regExp: /[÷×\-+:.]{2,}/g,
    errorText: 'Two operators in a row',
    isCritical: true,
  },

  {
    regExp: /(÷0+[^0-9]+)|(÷0+$)/g,
    match: /÷0+/,
    errorText: "Can't divide by zero",
    isCritical: false,
  },

  {
    regExp: /(\d*[.:]\d*){2,}/g,
    errorText: 'Two separators in one number (: or .)',
    isCritical: true,
  },
]
