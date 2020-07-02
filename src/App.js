import React from 'react';
import styled from 'styled-components';

import ExpressionInput from './components/ExpressionInput';
import Keyboard from './components/Keyboard';

const Main = styled.div`
  height: 100vh;
  width: 100vw;
`

const ExpressionInputContainer = styled.div`
  height: 35%;
`;

const KeyboardContainer = styled.div`
  height: 65%;
`

function App() {
  return (
    <Main>
      <ExpressionInputContainer>
        <ExpressionInput/>
      </ExpressionInputContainer>

      <KeyboardContainer>
        <Keyboard/>
      </KeyboardContainer>
    </Main>
  );
}

export default App;
