import useStyles from 'app/styles'

import Keyboard from 'features/input/Keyboard'

import { useMemo, useState } from 'react'
import { uniqueId } from 'lodash'
import type { FC } from 'react'
import { Input } from './Input'
import { Value } from './Input/Value'

const AppLayout: FC = () => {
  const styles = useStyles()

  const [inputValue, setInputValue] = useState('')

  const splittedValue = useMemo(() => {
    const resArr = []

    for (let i = 0; i < inputValue.length; i += 2) {
      if (i === 0) {
        resArr.push(inputValue.slice(i, i + 3))
        i += 1
      } else if (i === 3) {
        resArr.push(inputValue.slice(i, i + 3))
        i += 1
      } else {
        resArr.push(inputValue.slice(i, i + 2))
      }
    }

    return resArr
  }, [inputValue])

  const pattern = '-XX-XXX-XX-XX'

  const numberPlaceholderCharacter = 'X'

  const numbersInPattern = pattern.matchAll(/X/g)
  // [...input].reduce((formattedPhone, character, index) => {
  //     if(index + 1 < numbersInPattern) {
  //         return `formattedPhone${character}`;
  //     }

  //     return `${formattedPhone}${character}`;
  // }, pattern))

  let lastReplacedIndex = -1

  return (
    <div className={styles.root}>
      should be like: <input type="text" />
      <div className={styles.expressionInput}>
        <Input
          onInput={(event) => {
            setInputValue((event.target as HTMLInputElement).value)
          }}
          className={styles.inputFocused}
          value={inputValue}
          maxLength={9}
        >
          +380
          {[...pattern].map((character) => {
            if (lastReplacedIndex === inputValue.length - 1) return undefined

            if (character === numberPlaceholderCharacter) {
              lastReplacedIndex += 1
              return (
                <Value key={uniqueId('test')}>
                  {inputValue[lastReplacedIndex]}
                </Value>
              )
            }

            return character
          })}
          <Value>{inputValue.slice(lastReplacedIndex + 1)}</Value>
        </Input>
      </div>
      <div className={styles.keyboard}>
        <Keyboard />
      </div>
    </div>
  )
}

export default AppLayout
