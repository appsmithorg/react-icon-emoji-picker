import React from "react";
import styled from "styled-components";
import EmojiSelectorLayout from "./components/EmojiSelectorLayout";
import EmojiIconSelector from "./components/EmojiIconSelector";

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  > * + * {
    margin-left: 2rem;
  }
`;


type AppProps = {
  size: { height: number; width: number };
};

const App = (props: AppProps) => {
  return (
    <Container>
      <EmojiSelectorLayout />
      <EmojiIconSelector />
    </Container>
  );
};

export default App;
