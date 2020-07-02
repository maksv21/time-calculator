import React from 'react';
//import StyledButton from "./StyledButton";
import styled from 'styled-components';

const BUTTONS_LEFT = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['.', '0', ':'],
  ['(', ')', '='],
]

const BUTTONS_RIGHT = ['DEL', '÷', '×', '-', '+',]

const Keyboard = styled.div`
  height: 100%;
  display: flex;
`

const StyledButton = styled.button`
  background-color: rgba(0,0,0,0);
  border: none;
  height: 100%;
  width: 100%;
  font-size: 14pt;
`;


const LeftColumn = styled.div`
  background-color: #f7f7f7;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  height: 100%;
`

const RightColumn = styled.div`
  width: 100%;
  flex-shrink: 3;
  background-color: #26a69a;
  display: flex;
  flex-direction: column;
`

const mapButtons = btnValue => (
  <StyledButton
    key={btnValue}
    onClick={() => console.log(btnValue)}>
    {btnValue}
  </StyledButton>
);

export default () => {
  return (
    <Keyboard>
      <LeftColumn>
        {
          BUTTONS_LEFT.map(buttonsRow =>
            <Row key={buttonsRow}>{buttonsRow.map(mapButtons)}</Row>
          )
        }
      </LeftColumn>
      <RightColumn>
        {BUTTONS_RIGHT.map(mapButtons)}
      </RightColumn>
    </Keyboard>
  )
};
