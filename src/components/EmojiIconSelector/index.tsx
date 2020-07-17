import React, { useState } from "react";
import styled from 'styled-components';
import Popup from "../Popup";
import EmojiSelectorLayout from "../EmojiSelectorLayout";

const IconSelector = styled.button`
  display: inline-block;
  cursor: pointer;
  min-height: 2rem;
  min-width: 2rem;
`;

const EmojiIconSelector = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, selectIcon] = useState<React.ReactNode | undefined>();
  
  const handleClick = () => {
    setOpen(!open);
  };
  
  return (
    <>
      <IconSelector onClick={handleClick}>{selected}</IconSelector>
      <Popup open={open} onDoneClicked={() => handleClick()}>
        <EmojiSelectorLayout onSelectIcon={selectIcon} />
      </Popup>
    </>
  );
}

export default EmojiIconSelector;


