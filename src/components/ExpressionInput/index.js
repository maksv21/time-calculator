import React from 'react';
import { useSelector } from 'react-redux';

export default () => {
  const {value: inputValue, preResult: result} = useSelector(s => s.mainInput);
  console.log(inputValue)
  return (
    <>
      <div>{inputValue}</div>
      <div>{result === 'Incorrect expression' ? '' : result}</div>
    </>
  )
};
