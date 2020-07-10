import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const InputContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column;
  text-align: right;
  padding: 0 10px;
`;

const InputValue = styled.div`
  height: 50px; // height if there's no value
  font-size: 40px;
  overflow: auto;
`;

const PreResult = styled.div`
  height: 30px; // height if there's no value
  font-size: 25px; 
  overflow: auto;
`;

export default () => {
  const {value: inputValue, preResult} = useSelector(s => s.mainInput);
  return (
    <InputContainer>
      <InputValue>{inputValue}</InputValue>
      <PreResult>{preResult}</PreResult>
    </InputContainer>
  )
};
