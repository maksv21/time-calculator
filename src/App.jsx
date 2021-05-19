import styled from 'styled-components'

import ExpressionInput from './components/ExpressionInput'
import Keyboard from './features/input/Keyboard'

const Main = styled.div`
  height: 100%;
  width: 100%;
`

const ExpressionInputContainer = styled.div`
  height: 30%;
  position: relative;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
`

const KeyboardContainer = styled.div`
  height: 70%;
`

function App() {
  return (
    <Main>
      <ExpressionInputContainer>
        <ExpressionInput />
      </ExpressionInputContainer>

      <KeyboardContainer>
        <Keyboard />
      </KeyboardContainer>
    </Main>
  )
}

export default App
