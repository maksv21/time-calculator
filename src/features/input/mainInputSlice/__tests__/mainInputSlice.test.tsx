import { OperatorKeys } from 'features/input/mainInputSlice/types'
import { TypesOfRenderValue } from 'features/input/mainInputSlice/utils/textTesters/runTextTesters'
import mainInputReducer, { generalOrDelKeyPressed, initialState } from '..'

describe('mainInputTests', () => {
  describe('generalOrDelKeyPressed', () => {
    it('if no value entered should add only entered value', () => {
      expect(
        mainInputReducer(initialState, generalOrDelKeyPressed('1'))
      ).toStrictEqual({
        ...initialState,
        value: '1',
        caretPosition: 1,
        preResult: '1:00',
        valueToRender: '1',
      })
    })

    it('if some value was entered and number pressed should add', () => {
      expect(
        mainInputReducer(
          { ...initialState, value: '1234:5', caretPosition: 6 },
          generalOrDelKeyPressed('6')
        )
      ).toStrictEqual({
        ...initialState,
        value: '1234:56',
        caretPosition: 7,
        preResult: '1234:56',
        valueToRender: '1234:56',
      })
    })

    it.each([
      [
        { ...initialState, value: '1111111111' },
        '1',
        { ...initialState, value: '1111111111' },
      ],
      [
        { ...initialState, value: '1+', caretPosition: 2 },
        OperatorKeys.Plus,
        { ...initialState, value: '1+', caretPosition: 2 },
      ],
    ])(
      'if maximum number or operator was entered should add nothing',
      (state, pressedButton, expectedState) => {
        expect(
          mainInputReducer(state, generalOrDelKeyPressed(pressedButton as '1'))
        ).toStrictEqual(expectedState)
      }
    )

    describe('if there is errors should show it', () => {
      it('if number is too big', () => {
        expect(
          mainInputReducer(
            { ...initialState, value: '11111111111' },
            generalOrDelKeyPressed('1')
          )
        ).toStrictEqual({
          ...initialState,
          value: '111111111111',
          caretPosition: 1, // if there already is an error, the entered key should be added to the value
          error: 'Number is too big',
          valueToRender: [
            {
              type: TypesOfRenderValue.error,
              value: '111111111111',
            },
          ],
        })
      })

      it('if two operators in a row', () => {
        expect(
          mainInputReducer(
            { ...initialState, value: '1++', caretPosition: 2 },
            generalOrDelKeyPressed(OperatorKeys.Plus)
          )
        ).toStrictEqual({
          ...initialState,
          value: '1+++',
          caretPosition: 3,
          error: 'Two operators in a row',
          valueToRender: [
            {
              type: TypesOfRenderValue.value,
              value: '1',
            },
            {
              type: TypesOfRenderValue.error,
              value: '+++',
            },
          ],
        })
      })

      it('if two errors', () => {
        expect(
          mainInputReducer(
            { ...initialState, value: 'k1++' },
            generalOrDelKeyPressed('1')
          )
        ).toStrictEqual({
          ...initialState,
          value: '1k1++',
          caretPosition: 1,
          error: 'Incorrect characters',
          valueToRender: [
            {
              type: TypesOfRenderValue.value,
              value: '1',
            },
            {
              type: TypesOfRenderValue.error,
              value: 'k',
            },
            {
              type: TypesOfRenderValue.value,
              value: '1',
            },
            {
              type: TypesOfRenderValue.error,
              value: '++',
            },
          ],
        })
      })
    })
  })
})
