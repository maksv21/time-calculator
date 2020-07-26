import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import { keyPressed } from '../../actions';

const BUTTONS_LEFT = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['.', '0', ':'],
  ['='],
]

const BUTTONS_RIGHT = ['C', 'DEL', '÷', '×', '-', '+',]

const Keyboard = styled.div`
  height: 100%;
  display: flex;
`;

const StyledButton = styled.button`
  background-color: rgba(0,0,0,0);
  border: none;
  height: 100%;
  width: 100%;
  font-size: 14pt;
  
  &:focus {
    background-color: rgba(0,0,0,.15);
    outline: none;
  }
`;


const LeftColumn = styled.div`
  background-color: #f7f7f7;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  height: 100%;
`;

const RightColumn = styled.div`
  width: 100%;
  flex-shrink: 3;
  background-color: #ffe0b2;
  display: flex;
  flex-direction: column;
`;

const mapButtons = (btnValue, dispatch) => (
  <StyledButton
    key={btnValue}
    onClick={() => dispatch(keyPressed(btnValue))}>
    {btnValue}
  </StyledButton>
);

export default () => {
  const dispatch = useDispatch();

  return (
    <Keyboard>
      <LeftColumn>
        {
          BUTTONS_LEFT.map(buttonsRow =>
            <Row key={buttonsRow}>{buttonsRow.map(btnValue => mapButtons(btnValue, dispatch))}</Row>
          )
        }
      </LeftColumn>
      <RightColumn>
        {BUTTONS_RIGHT.map(btnValue => mapButtons(btnValue, dispatch))}
      </RightColumn>
    </Keyboard>
  )
};
