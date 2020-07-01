import React from "react";
import StyledButton from "./StyledButton";

// pattern: BUTTONS = Array of button arrays
// a button array means a new row
// a button array consist of two values: 1 for the left part of the keyboard, 2 for the right part
// 1 value = an array of buttons
// 2 value = a button
// button = a string
const BUTTONS = [
  [['7', '8', '9'], 'DEL'],
  [['4', '5', '6'], '÷'],
  [['1', '2', '3'], '×'],
  [['.', '0', ':'], '-'],
  [['='], '+'],
]

export default () => {
  return (
    <div>
      {
        BUTTONS.map(buttonsRow => {
          return (
            <div className="row" key={buttonsRow}>
              {
                buttonsRow[0].map(btnValue => {
                  return (
                    <StyledButton
                      key={btnValue}
                      className="left-part"
                      onClick={() => console.log(btnValue)}>{btnValue}</StyledButton>
                  )
                })
              }

              <StyledButton
                className="right-part"
                onClick={() => console.log(buttonsRow[1])}>{buttonsRow[1]}</StyledButton>
            </div>
          )
        })
      }
    </div>
  )
}
