import { screen, fireEvent } from '@testing-library/react'
import { renderWithStore } from 'utils/tests'
import CustomInput from '..'

describe('CustomInput', () => {
  describe('basic input tests', () => {
    it('should render one element if value is a string', () => {
      const valueMock = '123+456'

      renderWithStore(
        <CustomInput
          value={valueMock}
          valueOneString={valueMock}
          caretPosition={0}
          onInput={() => null}
          onEqualsKeyPressed={() => null}
          onCaretPositionChange={() => null}
        />
      )
      // one node for calculation
      expect(screen.queryAllByText(valueMock).length).toBe(2)
    })

    it('should render few elements if value is an array', () => {
      const elements = ['123', '456', '789']
      const valueMock = elements.map((e) => <div>{e}</div>)
      const valueMockString = elements.join('')

      renderWithStore(
        <CustomInput
          value={valueMock}
          valueOneString={valueMockString}
          caretPosition={0}
          onInput={() => null}
          onEqualsKeyPressed={() => null}
          onCaretPositionChange={() => null}
        />
      )
      elements.forEach((elementValue) =>
        expect(screen.getByText(elementValue)).toBeInTheDocument()
      )
    })
  })

  describe('keyboard events', () => {
    it('should call onInput on keyboard events', () => {
      const onInputHandler = jest.fn()

      renderWithStore(
        <CustomInput
          value=""
          valueOneString=""
          caretPosition={0}
          onInput={onInputHandler}
          onEqualsKeyPressed={() => null}
          onCaretPositionChange={() => null}
        />
      )

      const eventValueMock = '1'

      fireEvent.keyDown(document, {
        key: eventValueMock,
      })

      expect(onInputHandler).toBeCalledWith(
        eventValueMock,
        eventValueMock.length,
        true
      )
    })

    it('should call onInput on paste events', () => {
      const onInputHandler = jest.fn()

      renderWithStore(
        <CustomInput
          value=""
          valueOneString=""
          caretPosition={0}
          onInput={onInputHandler}
          onEqualsKeyPressed={() => null}
          onCaretPositionChange={() => null}
        />
      )

      const eventValueMock = '123'

      fireEvent.paste(document, {
        clipboardData: { getData: () => eventValueMock },
      })

      expect(onInputHandler).toBeCalledWith(
        eventValueMock,
        eventValueMock.length,
        false
      )
    })
  })
})
