import { uniqueId } from 'lodash'
import type { FC } from 'react'

type ValueProps = {
  children: string
}

export const Value: FC<ValueProps> = ({ children }) => {
  return (
    <>
      {[...children].map((character) => {
        return (
          <span key={uniqueId('ch')} data-custom-input-character>
            {character}
          </span>
        )
      })}
    </>
  )
}
